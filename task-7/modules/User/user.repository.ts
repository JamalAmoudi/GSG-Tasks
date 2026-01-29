import { genericRepo } from "../../shared/generic.repository";
import { RolesNamesType } from "../../util/constant";
import { User } from "./user.entity";


export class userRepository {
    private repo = new genericRepo<User>();
    private counter = 0;

    allUsers(): User[] {
        return this.repo.getAll();
    }

    findUserById(id: string): User | undefined {
        return this.repo.getById(id);
    }

    findUserByEmail(email: string): User | undefined {
        return this.repo.findOne(user => user.email === email);
    }

    createUser(name: string, email: string, password: string, role: RolesNamesType): User | undefined {
        const user: User = {
            id: this.counter.toString(),
            name,
            email,
            password,
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.counter++;
        return this.repo.create(user);
    }

    updateUser(id: string, name?: string, email?: string): User | null {
        const user = this.findUserById(id);
        if (!user) return null;
        if (name) user.name = name;
        if (email) user.email = email;

        return this.repo.update(id, user);
    }

    deleteUser(id: string): boolean {
        return this.repo.delete(id);
    }

    isUserStillExisted(id: string): boolean {
        return this.repo.isExisted(id);
    }


}