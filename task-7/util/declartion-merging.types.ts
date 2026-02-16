import { User } from "../modules/User/user.entity";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

