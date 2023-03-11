import { Discussion } from './Discussion';

export interface Course {
  courseId: number;
  courseName: string;
  profId: number;
  discussions: Discussion[];
}
