import { CourseRepository } from "./course.repository";
import { Course } from "./course.entity";

export class CourseService {
    constructor(private CourseRepo: CourseRepository) { }

    getAll(): Course[] {
        return this.CourseRepo.allCourses();
    }

    getOne(id: string): Course | undefined {
        return this.CourseRepo.findCourseById(id);
    }

    findOneById(id: string): Course | undefined {
        return this.CourseRepo.findCourseById(id);
    }

    findOneByTitle(title: string): Course | undefined {
        return this.CourseRepo.findCourseByTitle(title.toUpperCase());
    }

    createOne(title: string, description: string, image?: string): Course {
        return this.CourseRepo.createCourse(title, description, image)
    }

    updateOne(id: string, title?: string, description?: string, image?: string): Course | null {
        return this.CourseRepo.updateCourse(id, title, description, image);
    }

    deleteOne(id: string): boolean {
        return this.CourseRepo.deleteCourse(id);
    }


}