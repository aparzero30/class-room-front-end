import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Course } from 'src/interfaces/Course';
import { Discussion } from 'src/interfaces/Discussion';
import { CourseService } from 'src/services/course.service';
import { DiscussionService } from 'src/services/discussion.service';

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.scss'],
})
export class CoursepageComponent {
  constructor(
    private service: CourseService,
    private discService: DiscussionService,
    private router: Router
  ) {}

  selectedCourse!: Course | null;
  course!: Course;
  discussions!: Discussion[];
  courseId!: number;

  ngOnInit(): void {
    this.selectedCourse = this.service.getSelectedCourse();
    this.getSelectedCourse();
    this.getAllDiscussion();
  }

  public getAllDiscussion() {
    this.discService.getAllDiscussions(this.courseId).subscribe({
      next: (v) => {
        this.discussions = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
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
      myElement.style.height = '80vh';
      myElement.style.boxShadow = '5px 5px 5px 5px rgba(0, 0, 0, 0.2)';

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
}
