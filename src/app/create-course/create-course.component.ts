import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent {
  courseName = '';

  constructor(private service: CourseService, private router: Router) {}

  public createCourse(): void {
    this.service.createCourse(this.courseName).subscribe({
      next: (v) => {
        this.router.navigate(['/curiosity']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
