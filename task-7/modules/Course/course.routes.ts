import { RequestHandler, Router } from "express";
import { courseController } from "./course.controller";
import { isAuthenticated, restrictTo } from "../../middlewares/auth.middleware";

const router = Router();
router.get(
    "/",
    courseController.getAllCourses.bind(courseController) as RequestHandler,
);

router.get(
    "/title/:cTitle",
    courseController.getCourseByTitle.bind(courseController) as RequestHandler,
);
router.get(
    "/:cId",
    courseController.getCourse.bind(courseController) as RequestHandler,
);

router.use(isAuthenticated);
router.use(restrictTo("ADMIN", "COACH"));
router
    .route("/:cId")
    .patch(
        courseController.updateCourse.bind(courseController) as RequestHandler,
    )
    .delete(
        courseController.deleteCourse.bind(courseController) as RequestHandler,
    );

router.post(
    "/create",
    courseController.createCourse.bind(courseController) as RequestHandler,
);

export const courseRoutes = router;
