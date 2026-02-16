import { Request, Response, NextFunction } from "express"
import { userService } from "./user.service";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";


// At controller we are dealing with request & response
class UserController {
    // dependency injection

    private service = userService;

    getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users: User[] = this.service.getUsers();
        return res.send(users);
    }

    getUser(req: Request, res: Response, next: NextFunction) {
        console.log("auth header:", req.headers.authorization);
        console.log("cookies:", req.cookies);
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = this.service.getUserById(userId);
        // if (req.params.uid)
        //     user = this.service.getUserById(req.params.uid);

        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        return res.status(200).json(user);
    }

    getUserByEmail(req: Request<{ email: string }>, res: Response, next: NextFunction) {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ message: "Email Required" });
        }
        const user = this.service.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        };

        return res.status(200).send(user);
    }

    public async creatUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, role } = req.body;

        const checkOne = this.service.getUserByEmail(email);
        if (checkOne) {
            return res.status(400).json({ message: "There is a user with same credentials" });
        }
        const createdUser = this.service.rigesterUser(name, email, password, role);

        return res.send(createdUser)
    }

    updateUser(req: Request<{ uid: string }>, res: Response, next: NextFunction) {
        const userId = req.params.uid;
        if (!userId) {
            return res.status(400).json({ message: "ID Required" });
        }
        const user = this.service.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found!" });
        };

        const { name, email } = req.body;
        const updatedUser = this.service.updateUserAccount(userId, name, email);
        return res.send(updatedUser)
    }

    deleteUser(req: Request<{ uid: string }>, res: Response, next: NextFunction) {
        const userId = req.params.uid;
        if (!userId) {
            return res.status(400).json({ message: "ID Required" });
        }
        const deletedUser = this.service.deleteUserAccount(userId);
        return res.send(deletedUser)
    }

}

export const userController = new UserController();