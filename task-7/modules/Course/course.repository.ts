import { dbClient } from "../../services/prisma.service";
import type { Prisma } from "@prisma/client";
import { Course } from "./course.entity";

export class CourseRepository {
    private courseRepo = dbClient.course;
    async allCourses(
        query: Prisma.CourseFindFirstArgs["where"],
    ): Promise<Course[]> {
        return await this.courseRepo.findMany({ where: query });
    }

    findCourseById(id: number): Promise<Course> {
        return this.courseRepo.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    findCourseByTitle(title: string): Promise<Course> {
        return this.courseRepo.findFirstOrThrow({
            where: {
                title,
            },
        });
    }

    createCourse(
        title: string,
        description: string,
        image?: string,
    ): Promise<Course> {
        const course: Omit<Course, "id"> = {
            title: title,
            description,
            image: image || null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return this.courseRepo.create({
            data: course,
        });
    }

    updateCourse(
        id: number,
        title?: string,
        description?: string,
        image?: string,
    ): Promise<Course> {
        return this.courseRepo.update({
            where: { id },
            data: { title, description, image },
        });
    }

    async deleteCourse(id: number): Promise<boolean> {
        const course = await this.findCourseById(id);
        if (course) {
            this.courseRepo.delete({ where: { id } });
            return true;
        }
        return false
    }

}
