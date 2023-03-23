import { Component } from '@angular/core';
import { Course } from 'src/interfaces/Course';
import { CourseService } from 'src/services/course.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { Role } from 'src/interfaces/Role';

@Component({
  selector: 'app-instruct-subjects',
  templateUrl: './instruct-subjects.component.html',
  styleUrls: ['./instruct-subjects.component.scss'],
})
export class InstructSubjectsComponent {
  constructor(
    private service: CourseService,
    private router: Router,
    private auth: AuthService
  ) {}

  public courses: Course[] | null = [];
  public role!: Role;

  ngOnInit(): void {
    this.getCourses();
    this.getRole();
    this.getAllCoursesForInstructors();
    this.getAllCoursesForStudent();
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
    const me: User | null = this.auth.getStoredUser();
    if (me !== null) {
      this.role = me.role;
      if (this.role === 'instructor') {
        this.getAllCoursesForInstructors();
      } else {
        this.getAllCoursesForStudent();
      }
    }
  }

  public getAllCoursesForInstructors(): void {
    this.service.getAllCoursesForInstructors().subscribe({
      next: (v) => {
        this.courses = v;
        this.service.storeCourses(this.courses);
        this.loading = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
        console.log(this.loading);
      },
    });
  }

  public getAllCoursesForStudent(): void {
    this.service.getAllCoursesForStudent().subscribe({
      next: (v) => {
        this.courses = v;
        this.service.storeCourses(this.courses);
        this.loading = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      },
    });
  }
}
