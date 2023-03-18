import { Component } from '@angular/core';
import { CourseService } from 'src/services/course.service';
import { Role } from 'src/interfaces/Role';
import { Course } from 'src/interfaces/Course';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public role!: Role;
  public courseName!: string;
  public courseId!: number;

  constructor(private service: CourseService, private stud: StudentService) {}

  ngOnInit(): void {
    this.getRole();
  }

  // methods for instructors --------------------------------------------------------------------------

  public addCourse(): void {
    this.service.createCourse(this.courseName).subscribe({
      next: (v) => {
        const myElement = document.getElementById('instructorfrm');
        if (myElement) {
          myElement.style.height = '0';
        }
        this.close();
        location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  // methods for studentss --------------------------------------------------------------------------

  public enrollID!: number;

  public enroll(): void {
    // alert('hello');
    this.stud.enroll(this.enrollID).subscribe({
      next: (v) => {
        const myElement = document.getElementById('studentfrm');
        if (myElement) {
          myElement.style.height = '0';
        }
        this.close();
        location.reload();
      },
      error: (e) => {
        alert('Not found');
      },
      complete: () => console.info('complete'),
    });
  }

  // methods for css related ---------------------------------

  public close() {
    let formId = 'studentfrm';
    if (this.role === 'instructor') {
      formId = 'instructorfrm';
    }
    const myDiv = document.getElementById('box-wrapper');
    if (myDiv) {
      myDiv.style.pointerEvents = 'auto'; // disable pointer events on the div
      myDiv.style.opacity = '1'; // set the opacity to 50%
    }

    const myElement = document.getElementById(formId);

    if (myElement) {
      myElement.style.height = '0vh';
      myElement.style.boxShadow = ''; // remove the box-shadow style
    }
  }

  // token methods ------------------------------------------------------------------

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
