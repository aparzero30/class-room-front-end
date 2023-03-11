import { Component } from '@angular/core';
import { CourseService } from 'src/services/course.service';
import { Role } from 'src/interfaces/Role';
import { Course } from 'src/interfaces/Course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public role!: Role;
  public courseName!: string;

  constructor(private service: CourseService) {}

  ngOnInit(): void {
    this.getRole();
  }

  public addCourse(): void {
    this.service.createCourse(this.courseName).subscribe({
      next: (v) => {
        const myElement = document.getElementById('instructorfrm');
        if (myElement) {
          myElement.style.height = '0';
        }
        location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  public close() {
    let formId = 'studentfrm';
    if (this.role === 'instructor') {
      formId = 'instructorfrm';
      const myDiv = document.getElementById('instructor');
      if (myDiv) {
        myDiv.style.pointerEvents = 'auto'; // disable pointer events on the div
        myDiv.style.opacity = '1'; // set the opacity to 50%
        myDiv.style.backgroundColor = 'black'; // set the background color to gray
      }
    }
    const myElement = document.getElementById(formId);

    if (myElement) {
      myElement.style.height = '0vh';
      myElement.style.boxShadow = ''; // remove the box-shadow style
    }
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
}
