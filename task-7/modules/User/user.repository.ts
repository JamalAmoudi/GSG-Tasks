import { dbClient } from "../../services/prisma.service";
import { RolesNamesType } from "../../util/constant";
import { Prisma } from "@prisma/client";
import { User } from "./user.entity";


export class UserRepository {
    private userRepo = dbClient.user;


    allUsers(query: Prisma.UserFindManyArgs['where']): Promise<User[]> {
        return this.userRepo.findMany({ where: query });
    }

    findUserById(id: number): Promise<User | null> {
        return this.userRepo.findUniqueOrThrow({ where: { id } });
    }

    findUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findUniqueOrThrow({ where: { email } });
    }

    createUser(name: string, email: string, password: string, role: RolesNamesType): Promise<User> {
        const user: Omit<User, 'id'> = {
            name,
            email,
            password,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        return this.userRepo.create({ data: user });
    }

    updateUser(id: number, name?: string, email?: string): Promise<User | null> {
        return this.userRepo.update({
            where: {
                id
            },
            data: {
                name,
                email
            }
        });
    }

    async deleteUser(id: number): Promise<boolean> {
        const course = await this.findUserById(id);
        if (course) {
            this.userRepo.delete({ where: { id } });
            return true;
        }
        return false
    }


}