import { Component } from '@angular/core';
import { CourseService } from 'src/services/course.service';
import { Role } from 'src/interfaces/Role';
import { Course } from 'src/interfaces/Course';
import { StudentService } from 'src/services/student.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/services/role.service';
import { User } from 'src/interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public role!: Role;
  public courseName!: string;
  public courseId!: number;

  constructor(
    private service: CourseService,
    private stud: StudentService,
    private auth: AuthService,
    private router: Router,
    private rlservice: RoleService
  ) {}

  ngOnInit(): void {
    this.checkSession();
    this.getRole();
  }

  loading: boolean = false;

  // methods for instructors --------------------------------------------------------------------------

  public addCourse(): void {
    this.loading = true;
    this.service.createCourse(this.courseName).subscribe({
      next: (v) => {
        const myElement = document.getElementById('instructorfrm');
        if (myElement) {
          myElement.style.height = '0';
        }
        this.closed();
        location.reload();
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      },
    });
  }

  // methods for studentss --------------------------------------------------------------------------

  public enrollID!: number;

  public enroll(): void {
    this.loading = true;
    this.stud.enroll(this.enrollID).subscribe({
      next: (v) => {
        const myElement = document.getElementById('studentfrm');
        if (myElement) {
          myElement.style.height = '0';
        }
        this.closed();
        location.reload();
      },
      error: (e) => {
        alert('Not found');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  // methods for css related ---------------------------------

  public closed() {
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
    const me: User | null = this.auth.getStoredUser();
    if (me !== null) {
      this.role = me.role;
    }
  }

  public checkSession(): void {
    const token = this.auth.getSession();
    if (token === null) {
      this.router.navigate(['/login']);
    }
  }
}
