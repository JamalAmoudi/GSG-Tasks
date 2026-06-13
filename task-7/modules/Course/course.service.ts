import { CourseRepository } from "./course.repository";

export class CourseService {
    private repository = new CourseRepository();
    getAll(page: number, limit: number) {
        return this.repository.allCourses({});
    }

    getOne(id: number) {
        return this.repository.findCourseById(id);
    }

    findOneById(id: number) {
        return this.repository.findCourseById(id);
    }

    findOneByTitle(title: string) {
        return this.repository.findCourseByTitle(title.toUpperCase());
    }

    createOne(title: string, description: string, image?: string) {
        return this.repository.createCourse(title, description, image)
    }

    updateOne(id: number, title?: string, description?: string, image?: string) {
        return this.repository.updateCourse(id, title, description, image);
    }

    deleteOne(id: number) {
        return this.repository.deleteCourse(id);
    }


}