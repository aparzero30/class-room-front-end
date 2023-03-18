import { Component } from '@angular/core';
import { Course } from 'src/interfaces/Course';
import { Role } from 'src/interfaces/Role';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public role!: Role;

  constructor(private service: CourseService) {}

  ngOnInit(): void {
    this.getRole();
  }

  public getRole(): void {
    this.service.getCurrentRole().subscribe({
      next: (v) => {
        this.role = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  public createCourse(): void {
    let formId = 'studentfrm';
    if (this.role === 'instructor') {
      formId = 'instructorfrm';
    }
    const myDiv = document.getElementById('box-wrapper');

    if (myDiv) {
      myDiv.style.pointerEvents = 'none';
      myDiv.style.opacity = '0';
    }

    const myElement = document.getElementById(formId);

    if (myElement) {
      myElement.style.height = '30vh';
      myElement.style.boxShadow = '5px 5px 5px 5px rgba(0, 0, 0, 0.2)';
    }
  }
}
