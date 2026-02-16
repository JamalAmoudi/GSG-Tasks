import { CourseRepository } from "./course.repository";
import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import { Course } from "./course.entity";


class CourseController {
    private service = new CourseService(new CourseRepository)
    getAllCourses(req: Request, res: Response, next: NextFunction) {
        const courses: Course[] = this.service.getAll();
        return res.status(200).send(courses);
    }

    getCourse(req: Request<{ cId: string }>, res: Response, next: NextFunction) {
        const courseId = req.params["cId"];
        if (!courseId) {
            return res.status(400).json({ message: "Course ID Required" });
        }
        const wantedCourse = this.service.findOneById(courseId);
        if (!wantedCourse) {
            return res.status(404).json({ message: "Course Not Found!" });
        }

        return res.status(200).send(wantedCourse);
    }

    getCourseByTitle(req: Request<{ cTitle: string }>, res: Response, next: NextFunction) {
        const cTitle = req.params["cTitle"];
        if (typeof cTitle !== "string" || !cTitle.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }
        const courseTitle = cTitle.trim().toUpperCase();

        const wantedCourse = this.service.findOneByTitle(courseTitle);

        if (!wantedCourse) {
            return res.status(404).json({ message: "Course Not Found!" });
        }

        return res.status(200).send(wantedCourse);
    }

    createCourse(req: Request, res: Response, next: NextFunction) {
        const { title, description } = req.body;
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }
        const upperTitle = title.trim().toUpperCase();
        const checkOne = this.service.findOneByTitle(upperTitle);
        if (checkOne) {
            return res.status(400).json({ message: "There is a course with same name" });
        }
        // const image = req.file ? `/uploads/${req.file.fileName}` : undefined;
        const course = this.service.createOne(upperTitle, description);
        return res.status(200).send(course);
    }

    updateCourse(req: Request<{ cId: string }>, res: Response, next: NextFunction) {
        const courseId = req.params["cId"];
        if (!courseId) {
            return res.status(400).json({ message: "Course ID Required" });
        }
        const course = this.service.findOneById(courseId);
        if (!course) return res.status(404).json({ message: "Course Not Found" });
        const { title, description } = req.body;
        const upperTitle = title.trim().toUpperCase();
        const updatedCourse = this.service.updateOne(courseId, upperTitle, description);
        return res.status(200).send(updatedCourse)
    }

    deleteCourse(req: Request<{ cId: string }>, res: Response, next: NextFunction) {
        const courseId = req.params["cId"];
        if (!courseId) {
            return res.status(400).json({ message: "Course ID Required" });
        }

        return res.status(200).send(this.service.deleteOne(courseId));
    }
}

export const courseController = new CourseController(); 