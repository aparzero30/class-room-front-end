import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Discussion } from 'src/interfaces/Discussion';
import { DiscussionService } from 'src/services/discussion.service';

@Component({
  selector: 'app-discussionpage',
  templateUrl: './discussionpage.component.html',
  styleUrls: ['./discussionpage.component.scss'],
})
export class DiscussionpageComponent {
  constructor(private discService: DiscussionService, private router: Router) {}
  selectedDiscussion!: Discussion | null;
  discussion!: Discussion;

  ngOnInit(): void {
    this.selectedDiscussion = this.discService.getSelectedDiscussion();
    this.getSelectedDiscussion();
  }

  getSelectedDiscussion() {
    if (this.selectedDiscussion !== null) {
      this.discussion = this.selectedDiscussion;
    }
  }
}
