import { Component } from '@angular/core';
import { Course } from 'src/interfaces/Course';
import { CourseService } from 'src/services/course.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public courses: Course[] = [];

  constructor(
    private service: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.authService.getSession());
    this.getAllCourses();
    // this.demo();
  }

  public getAllCourses(): void {
    this.service.getAllCourses().subscribe({
      next: (v) => {
        this.courses = v;
        console.log(this.courses);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  public createCourse(): void {
    this.router.navigate(['curiosity/create']);
  }
}
