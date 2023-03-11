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
  public courses: Course[] = [];

  constructor(private service: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCoursesForInstructors();
  }

  public setCourse(selected: Course) {
    this.service.storeSelectedCourse(selected);
    this.router.navigate(['/coursepage']);
  }

  public getAllCoursesForInstructors(): void {
    this.service.getAllCoursesForInstructors().subscribe({
      next: (v) => {
        this.courses = v;
        console.log(this.courses);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
