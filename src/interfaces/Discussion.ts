import { Course } from './Course';

export interface Discussion {
  discussionId: number;
  title: string;
  body: string;
  course: Course;
}
