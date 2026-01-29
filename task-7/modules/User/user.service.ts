import { RolesNamesType } from "../../util/constant";
import { User } from "./user.entity";
import { userRepository } from "./user.repository";


export class userService {
    // dependency injection
    constructor(private userRepo: userRepository) { }
    getUsers(): User[] {
        return this.userRepo.allUsers();
    }
    getUserByEmail(email: string): User | undefined {
        return this.userRepo.findUserByEmail(email);
    }

    getUserById(id: string): User | undefined {
        return this.userRepo.findUserById(id);
    }

    rigesterUser(name: string, email: string, password: string, role: RolesNamesType): User | undefined {
        return this.userRepo.createUser(name, email, password, role);
    }

    updateUserAccount(id: string, name?: string, email?: string): User | null {
        return this.userRepo.updateUser(id, name, email);
    }

    deleteUserAccount(id: string): boolean {
        return this.userRepo.deleteUser(id);
    }

}