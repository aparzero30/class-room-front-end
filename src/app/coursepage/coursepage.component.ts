import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from 'src/interfaces/Course';
import { Discussion } from 'src/interfaces/Discussion';
import { Role } from 'src/interfaces/Role';
import { AuthService } from 'src/services/auth.service';
import { CourseService } from 'src/services/course.service';
import { DiscussionService } from 'src/services/discussion.service';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.scss'],
})
export class CoursepageComponent {
  constructor(
    private auth: AuthService,
    private service: CourseService,
    private discService: DiscussionService,
    private router: Router,
    private rlservice: RoleService
  ) {}

  selectedCourse!: Course | null;
  course!: Course;
  discussions: Discussion[] = [];
  courseId!: number;
  public role!: Role | null;

  ngOnInit(): void {
    this.checkSession();
    this.selectedCourse = this.service.getSelectedCourse();
    this.getSelectedCourse();
    this.getDiscussions();
    this.getAllDiscussion();
    this.getRole();
  }

  public getRole(): void {
    this.role = this.rlservice.getSession();
  }
  public getDiscussions() {
    const checker: Discussion[] | null = this.discService.getDiscussions();
    if (checker !== null) {
      this.discussions = checker;
    }
  }

  loading: boolean = true;

  public getAllDiscussion() {
    this.discService.getAllDiscussions(this.courseId).subscribe({
      next: (v) => {
        this.discussions = v;
        this.discService.storeDiscussion(this.discussions);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.loading = false;
      },
    });
  }

  getSelectedCourse() {
    if (this.selectedCourse !== null) {
      this.course = this.selectedCourse;
      // this.discussions = this.course.discussions;
      this.courseId = this.selectedCourse.courseId;
    }
  }

  publish() {
    const myElement = document.getElementById('publish');
    const myDiv = document.getElementById('box-wrapper');
    if (myElement && myDiv) {
      myElement.style.height = '82vh';
      myElement.style.borderWidth = '1px';

      myDiv.style.pointerEvents = 'none'; // disable pointer events on the div
      myDiv.style.opacity = '0'; // set the opacity to 50%
      myDiv.style.backgroundColor = 'white'; // set the background color to gray
    }
  }

  public close() {
    const myElement = document.getElementById('publish');
    const myDiv = document.getElementById('box-wrapper');

    if (myElement && myDiv) {
      myElement.style.height = '0vh';
      myElement.style.boxShadow = '';
      myElement.style.borderWidth = '0px';

      myDiv.style.pointerEvents = 'auto'; // disable pointer events on the div
      myDiv.style.opacity = '1'; // set the opacity to 50%
    }
  }

  title!: string;
  body!: string;
  disc!: Discussion;

  public createDisc(): void {
    this.discService
      .createDiscussion(this.title, this.body, this.courseId)
      .subscribe({
        next: (v) => {
          this.close();
          // this.router.navigate(['/coursepage']);
          this.getAllDiscussion();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  public viewDiscussion(discussion: Discussion) {
    this.discService.storeSelectedDiscussion(discussion);
    this.router.navigate(['/discussionpage']);
  }

  public checkSession(): void {
    const token = this.auth.getSession();
    if (token === null) {
      this.router.navigate(['/login']);
    }
  }
}
