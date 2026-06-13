import "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { getEnvOrThrow } from "../util/util";
import { PrismaClient } from "@prisma/client";


const dbUrl = getEnvOrThrow('DATABASE_URL');

export const dbClient = new PrismaClient({
    adapter: new PrismaMariaDb(dbUrl),
    log: ['query', 'error', 'warn', 'info']
});