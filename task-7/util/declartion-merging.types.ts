import { User } from "../modules/User/user.entity";

export type MyEnvs = {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    SESSION_SECRET: string;
    JWT_SECRET: string;
    MONGODB_URL: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }

    namespace NodeJS {
        interface ProcessEnv extends MyEnvs { }
    }
}

