import { Request, Response, NextFunction } from "express"
import { userService } from "./user.service";
import { User } from "./user.entity";
import { userRepository } from "./user.repository";


// At controller we are dealing with request & response
export class userController {
    // dependency injection
    private service = new userService(new userRepository());

    getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users: User[] = this.service.getUsers();
        return users;
    }

    getUser(req: Request<{ uid: string }>, res: Response, next: NextFunction) {
        const user = this.service.getUserById(req.params.uid);

        if (!user) {
            throw new Error("User not found")
            return;
        }

        return user;
    }

    creatUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, role } = req.body;

        const checkOne = this.service.getUserByEmail(email);
        if (checkOne) {
            throw new Error("There is a user with same credentials");
            return;
        }
        return this.service.rigesterUser(name, email, password, role);
    }

    updateUser(req: Request<{ uid: string }>, res: Response, next: NextFunction) {
        const userId = req.params.uid;
        if (!userId) {
            throw new Error("ID Required")
            return;
        }
        const user = this.service.getUserById(userId);
        if (!user) {
            throw new Error("User Not Found")
            return;
        };

        const { name, email } = req.body;
        return this.service.updateUserAccount(userId, name, email);
    }

    deleteUser(req: Request<{ uid: string }>, res: Response, next: NextFunction) {
        const userId = req.params.uid;
        if (!userId) {
            throw new Error("ID Required")
            return;
        }
        return this.service.deleteUserAccount(userId);
    }

}