import jwt, { SignOptions } from 'jsonwebtoken';

type JWT_PAYLOAD_INPUT = { sub: string, name: string }
type JWT_PAYLOAD = JWT_PAYLOAD_INPUT & { iat: number }
const JWT_SECRET = "JWT_SECRET";

//signJWT
export const signJWT = (payload: JWT_PAYLOAD_INPUT, options?: SignOptions) => {

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

}

//verifyJWT
export const verifyJWT = (token: string): JWT_PAYLOAD => {
    return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
}

