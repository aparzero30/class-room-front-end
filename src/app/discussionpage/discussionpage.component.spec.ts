import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionpageComponent } from './discussionpage.component';

describe('DiscussionpageComponent', () => {
  let component: DiscussionpageComponent;
  let fixture: ComponentFixture<DiscussionpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussionpageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscussionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
