import { Course } from "../modules/Course/course.entity";
import { faker } from '@faker-js/faker';


export function createdRandomCourse() {
    const randomCourse: Omit<Course, "id" | "user"> = {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph().slice(0, 191),
        image: faker.image.avatar(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
    }

    return randomCourse;
}