import { Router, RequestHandler } from "express";
import { userController } from "./user.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";
const router = Router();

router.post('/create', userController.creatUser.bind(userController) as RequestHandler);
router.get('/', userController.getAllUsers.bind(userController) as RequestHandler);
router.get('/email/:email', userController.getUserByEmail.bind(userController) as RequestHandler);

router.use(isAuthenticated);
router.get('/me', userController.getUser.bind(userController) as RequestHandler);

router.get('/:uid', userController.getUser.bind(userController) as RequestHandler);
router.patch('/:uid', userController.updateUser.bind(userController) as RequestHandler);
router.delete('/:uid', userController.deleteUser.bind(userController) as RequestHandler);


export const userRoutes = router;

