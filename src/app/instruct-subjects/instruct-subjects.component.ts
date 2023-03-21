import { Component } from '@angular/core';
import { Course } from 'src/interfaces/Course';
import { CourseService } from 'src/services/course.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { Role } from 'src/interfaces/Role';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-instruct-subjects',
  templateUrl: './instruct-subjects.component.html',
  styleUrls: ['./instruct-subjects.component.scss'],
})
export class InstructSubjectsComponent {
  constructor(
    private service: CourseService,
    private router: Router,
    private rlService: RoleService
  ) {}

  public courses: Course[] | null = [];
  public role!: Role;

  ngOnInit(): void {
    // this.getAllCoursesForInstructors();
    this.getCourses();
    this.getRole();
    this.getAllCoursesForInstructors();

    // if (this.role === 'instructor') {
    //   this.getAllCoursesForInstructors();
    // } else {
    //   alert(this.role);
    // }
  }

  public getCourses() {
    this.courses = this.service.getCourses();
  }

  loading: boolean = true;

  public setCourse(selected: Course) {
    this.service.storeSelectedCourse(selected);
    this.router.navigate(['/coursepage']);
  }

  public getRole(): void {
    this.rlService.getCurrentRole().subscribe({
      next: (v) => {
        // alert(v);
        this.role = v;
        if (this.role === 'instructor') {
          this.getAllCoursesForInstructors();
        } else {
          this.getAllCoursesForStudent();
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      },
    });
  }

  public getAllCoursesForInstructors(): void {
    this.service.getAllCoursesForInstructors().subscribe({
      next: (v) => {
        this.courses = v;
        this.service.storeCourses(this.courses);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  public getAllCoursesForStudent(): void {
    this.service.getAllCoursesForStudent().subscribe({
      next: (v) => {
        this.courses = v;
        this.service.storeCourses(this.courses);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
