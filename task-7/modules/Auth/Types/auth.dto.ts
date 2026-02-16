import { Response, Request } from "express";
import { User } from "../../User/user.entity";
import { RolesNamesType } from "../../../util/constant";

export type LoginDTO = {
    email: string,
    password: string
}

export type LoginResponseDTO = Omit<User, 'password'>;

export type RegisterDTO = Pick<User, 'name' | 'email' | 'password' | 'role'>
export type restrictToDTO = Omit<RolesNamesType, "STUDENT">
export type RegisterResponseDTO = Omit<User, 'password'>;

