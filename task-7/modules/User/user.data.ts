import { createdRandomUser } from "../../seeds/user.seeds";
import { faker } from "@faker-js/faker";
import { User } from "./user.entity";


export const userData: User[] = faker.helpers.multiple(createdRandomUser, { count: 5 });