import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructSubjectsComponent } from './instruct-subjects.component';
import { CourseService } from 'src/services/course.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructSubjectsComponent', () => {
  let component: InstructSubjectsComponent;
  let fixture: ComponentFixture<InstructSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructSubjectsComponent],
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
