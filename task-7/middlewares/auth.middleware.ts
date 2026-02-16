import { Request, Response, NextFunction } from "express"
import { verifyJWT } from "../modules/Auth/util/jwt.util";
import { CustomError, handleError } from "../util/exciptions";
import { MODULES_NAMES } from "../util/constant";
import { HttpErrorStatus } from "../util/util.types";
import { restrictToDTO } from "../modules/Auth/Types/auth.dto";
import { userService } from "../modules/User/user.service";




// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {

//         const jwt = authHeader.replace(`Bearer`, '');
//         console.log("jwt:", jwt);
//         try {
//             await verifyJWT(jwt);
//         } catch (error) {
//             console.log("jwt is wrong");
//         }
//     }
//     next(new CustomError('user is not Authenticated , Please login to the system by going to  /auth/login', MODULES_NAMES.auth, HttpErrorStatus.Unauthorized));
// }


// type risRoles = 'ADMIN' | 'COACH'
export const restrictTo = (...roles: restrictToDTO[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new CustomError("You don't have permisions to perform this action", MODULES_NAMES.auth, HttpErrorStatus.Forbidden));
        }
        console.log(req.user);

        next();
    }
}


// protect function 

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    // Remember that token is the 'JWT'

    // 1) Getting the token and check if it's there
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new CustomError('You are not logged in! Please log in to get access.', MODULES_NAMES.auth, HttpErrorStatus.BadRequest)
        );
    }
    // 2) Verification token
    try {
        const decodedUser = await verifyJWT(token);

        // 3) Check if user still exists
        const currentUser = await userService.getUserById(decodedUser.sub);
        if (!currentUser) {
            return next(
                new CustomError(
                    'The user belonging to this token does no longer exist.',
                    MODULES_NAMES.auth, HttpErrorStatus.BadRequest
                ),
            );
        }

        // 4) Check if user changed password after the token was issued

        if (currentUser.updatedAt.getTime() / 1000 > decodedUser.iat) {
            return next(
                new CustomError('User recently changed password! Please log in again', MODULES_NAMES.auth, HttpErrorStatus.Unauthorized),
            );
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;


        next();

    } catch (error) {
        return next(
            new CustomError('Invalid token! Please log in again', MODULES_NAMES.auth, HttpErrorStatus.Unauthorized)
        );
    }
};
