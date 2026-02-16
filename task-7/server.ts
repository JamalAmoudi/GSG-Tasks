import 'dotenv'
import './util/declartion-merging.types';
import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './modules/User/user.routes';
import { courseRoutes } from './modules/Course/course.routes';
import { handleError } from './util/exciptions';
import { authRoutes } from './modules/Auth/auth.routes';
import session from 'express-session';
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(
    session({
        secret: "IAM-A-SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 }
    })
);
// parse cookies from to requests {catch cookies from the browser and adding them into requests}
app.use(cookieParser());


const v1 = '/api/v1'
app.use(v1 + '/users', userRoutes);
app.use(v1 + '/courses', courseRoutes);
app.use(v1 + '/auth', authRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    handleError(error, res);
});

app.listen(5007, () => {
    console.log("App is running on PORT 5007");
});