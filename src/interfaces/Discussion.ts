import { Course } from './Course';
import { Comm } from './Comm';

export interface Discussion {
  discussionId: number;
  title: string;
  body: string;
  comments: Comm[];
  course: Course;
}
