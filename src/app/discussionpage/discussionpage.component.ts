import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from 'src/interfaces/Discussion';
import { DiscussionService } from 'src/services/discussion.service';
import { Comm } from 'src/interfaces/Comm';
import { CommentService } from 'src/services/comment.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-discussionpage',
  templateUrl: './discussionpage.component.html',
  styleUrls: ['./discussionpage.component.scss'],
})
export class DiscussionpageComponent {
  constructor(
    private discService: DiscussionService,
    private router: Router,
    private comServ: CommentService
  ) {}
  selectedDiscussion!: Discussion | null;
  discussion!: Discussion;
  comments!: Comm[];
  discId!: number;

  // setInterval(() => {
  //   this.getDiscussion();
  // }, 5000);

  ngOnInit(): void {
    this.selectedDiscussion = this.discService.getSelectedDiscussion();
    this.getSelectedDiscussion();
  }

  getSelectedDiscussion() {
    if (this.selectedDiscussion !== null) {
      this.discussion = this.selectedDiscussion;
      // this.comments = this.discussion.comments;
      this.discId = this.discussion.discussionId;
      this.getDiscussion();
    }
  }

  message!: string;

  public addComment(): void {
    this.comServ.addComment(this.message, this.discId).subscribe({
      next: (v) => {
        this.getDiscussion();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  public getDiscussion(): void {
    this.discService.getCurrentDiscussion(this.discId).subscribe({
      next: (v) => {
        this.discussion = v;
        this.comments = this.discussion.comments;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
}
