import 'dotenv'
import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './modules/User/user.routes';


const app = express();
app.use(express.json());
app.use(express.urlencoded());


const v1 = "api/v1"
app.use('/api/v1/users', userRoutes);

app.listen(5007, () => {
    console.log("App is running on PORT 5007");
});