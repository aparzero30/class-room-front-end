import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from 'src/interfaces/Discussion';
import { DiscussionService } from 'src/services/discussion.service';
import { Comm } from 'src/interfaces/Comm';
import { CommentService } from 'src/services/comment.service';
import { AuthService } from 'src/services/auth.service';
import { User } from 'src/interfaces/User';

@Component({
  selector: 'app-discussionpage',
  templateUrl: './discussionpage.component.html',
  styleUrls: ['./discussionpage.component.scss'],
})
export class DiscussionpageComponent {
  constructor(
    private auth: AuthService,
    private discService: DiscussionService,
    private router: Router,
    private comServ: CommentService
  ) {}
  selectedDiscussion!: Discussion | null;
  discussion!: Discussion;
  comments!: Comm[];
  discId!: number;
  user!: User;
  name: string = '';

  ngOnInit(): void {
    this.checkSession();
    this.getUser();
    this.getSessionComments();
    this.selectedDiscussion = this.discService.getSelectedDiscussion();
    this.getSelectedDiscussion();
    console.log(this.selectedDiscussion);
  }
  getUser() {
    const me: User | null = this.auth.getStoredUser();
    if (me !== null) {
      this.user = me;
      this.name = this.user.name;
    }
  }

  getSessionComments() {
    const com: Comm[] | undefined =
      this.discService.getSelectedDiscussion()?.comments;
    if (com !== undefined) {
      this.comments = com;
    }
  }

  getSelectedDiscussion() {
    if (this.selectedDiscussion !== null) {
      this.discussion = this.selectedDiscussion;
      this.discId = this.discussion.discussionId;
      this.getDiscussion();
    }
  }

  message!: string;

  public addComment(): void {
    const comment: Comm = {
      commentId: 0,
      discussionId: this.discId,
      userId: 0,
      message: this.message,
      name: this.name,
    };

    this.comments.push(comment);
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
        console.log(this.comments);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  public checkSession(): void {
    const token = this.auth.getSession();
    if (token === null) {
      this.router.navigate(['/login']);
    }
  }
}
