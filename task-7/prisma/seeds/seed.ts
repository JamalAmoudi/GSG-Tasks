import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { faker } from "@faker-js/faker";
import { createdRandomUser } from "../../seeds/user.seeds";
import { createdRandomCourse } from "../../seeds/course.seeds";

const prisma = new PrismaClient({
    adapter: new PrismaMariaDb(process.env.DATABASE_URL!)
})

async function main() {
    // delete all tables data
    await prisma.user.deleteMany();

    const users = faker.helpers.multiple(createdRandomUser, { count: 10 });

    for (const userData of users) {
        await prisma.user.create({
            data: {
                ...userData,
                courses: {
                    create: faker.helpers.multiple(createdRandomCourse, { count: 5 })
                }
            }
        })
    }
}

main().then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

