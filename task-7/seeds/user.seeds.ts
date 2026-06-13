import { User } from "../modules/User/user.entity";
import { faker } from '@faker-js/faker';
import { RolesNamesType } from "../util/constant";

type acceptedRoleTypes = Exclude<RolesNamesType, "ADMIN">;
const acceptedRoles: acceptedRoleTypes[] = ["STUDENT", "COACH"]

export function createdRandomUser() {
    const randomUser: Omit<User, "id" | "course"> = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(acceptedRoles),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
    }

    return randomUser;
}
