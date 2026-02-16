import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post('/register', authController.register.bind(authController) as RequestHandler);
router.post('/login', authController.login.bind(authController) as RequestHandler);
router.post('/login-jwt', authController.loginWithJWT.bind(authController) as RequestHandler);
router.post('/logout', authController.logout.bind(authController) as RequestHandler);

export const authRoutes = router;