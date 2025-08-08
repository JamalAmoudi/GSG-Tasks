import { Course } from '../models/courseModel';
import { BaseRepository } from './BaseRepository';

const courses: Course[] = [
  { id: "IT-2020-summer", title: 'TypeScript Basics', price: 99 },
  { id: "IT-2023-bootcamp", title: 'Advanced JS', price: 149 }
];

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super(courses);
  }
}
