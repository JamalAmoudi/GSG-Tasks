import { GenericRepo } from "../../shared/generic.repository";
import { Course } from "./course.entity";

export class CourseRepository {
    private repo = new GenericRepo<Course>;
    private counter = 1;
    allCourses(): Course[] {
        return this.repo.getAll();
    }

    findCourseById(id: string): Course | undefined {
        return this.repo.getById(id);
    }

    findCourseByTitle(title: string): Course | undefined {
        return this.repo.findOne(course => course.title === title);
    }

    createCourse(title: string, description: string, image?: string): Course {
        const course: Course = {
            id: this.counter.toString(),
            title: title,
            description,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        if (image) {
            course.image = image;
        }
        this.counter++;
        return this.repo.create(course);

    }

    updateCourse(id: string, title?: string, description?: string, image?: string): Course | null {
        const course = this.findCourseById(id);
        if (!course) return null;
        if (title) course.title = title;
        if (description) course.description = description;
        if (image) course.image = image;

        return course;
    }

    deleteCourse(id: string): boolean {
        return this.repo.delete(id);
    }
} 