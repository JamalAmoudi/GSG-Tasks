import { userService } from "../User/user.service";
import { UserRepository } from "../User/user.repository";
import { NextFunction } from "express";
import { User } from "../User/user.entity";
import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO } from "./Types/auth.dto";
import { creatArgonhash, verifyArgonHash } from "./util/argon.util";
import { removeFields } from "../../util/object.util";
export class AuthService {
    private service = userService;

    public async register(payload: RegisterDTO): Promise<RegisterResponseDTO | null> {
        const foundUser = await this.service.getUserByEmail(payload.email);
        if (!foundUser) {
            const hashedValue = await creatArgonhash(payload.password);

            const userData = await this.service.rigesterUser(payload.name, payload.email, hashedValue, payload.role);

            return removeFields(userData, ['password']);
        }
        return null
    }

    public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
        const foundUser = await this.service.getUserByEmail(payload.email);
        if (!foundUser) {
            return null
        }

        const verifiedValue = await verifyArgonHash(payload.password, foundUser.password);
        if (!verifiedValue) return null
        return removeFields(foundUser, ['password']);

    }

    public async logout() { }
}