import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { zodValidation } from "../../util/zod.util";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema";
import { MODULES_NAMES } from "../../util/constant";
import { HttpErrorStatus, StringObject } from "../../util/util.types";
import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO } from "./Types/auth.dto";
import { signJWT, verifyJWT } from "./util/jwt.util";
import { CustomError } from "../../util/exciptions";

class AuthController {
    private service = new AuthService();

    public async register(req: Request<StringObject, StringObject, RegisterDTO>, res: Response<RegisterResponseDTO | string>, next: NextFunction) {
        try {
            const payloadData = zodValidation(registerDTOSchema, req.body, MODULES_NAMES.auth);
            const user = await this.service.register(payloadData);
            if (user == null) {
                return res.status(400).send('There is a user with same credentials');
            }
            console.log('user registered succefully');

            return res.status(201).send(user);
        } catch (err) {
            res.status(HttpErrorStatus.InternalServerError)
                .send(`${err}`);
        }
    }

    public async login(req: Request<StringObject, StringObject, LoginDTO>, res: Response<LoginResponseDTO | string>, next: NextFunction) {
        try {
            const payloadData = zodValidation(loginDTOSchema, req.body, MODULES_NAMES.auth);
            const user = await this.service.login(payloadData);
            if (!user) {
                return res.status(401).send('Invalid credentials');
            }
            console.log('user loged-in succefully');
            return res.status(200).send(user);
        } catch (err) {
            res.status(HttpErrorStatus.InternalServerError)
                .send(`${err}`);
        }
    }

    public async loginWithJWT(req: Request<StringObject, StringObject, LoginDTO>, res: Response, next: NextFunction) {

        try {
            const payloadData = zodValidation(loginDTOSchema, req.body, MODULES_NAMES.auth);
            const user = await this.service.login(payloadData);
            if (!user) {
                res.status(401).send('Invalid credentials');
                return;
            }

            const token = signJWT({ sub: user.id, name: user.name });
            res.cookie('jwt', token, { maxAge: 900000, httpOnly: true });
            console.log('token:' + token);
            console.log('user loged-in succefully');
            return res.status(200).send({ user: user, token });
        } catch (err) {
            res.status(HttpErrorStatus.InternalServerError)
                .send(`${err}`);
        }

    }

    public logout(req: Request, res: Response) {

        res.cookie('jwt', { expires: new Date(Date.now() + 10 * 1000) });
        // if we use cookie-session we should invalidate cookie session
        // req.session.destroy(function (err): void { });
        console.log("User logout succefully!")
        return;
    }


}


export const authController = new AuthController();

