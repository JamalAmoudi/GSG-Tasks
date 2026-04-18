import { signJWT } from "../../modules/Auth/util/jwt.util";
import { userData } from "../../modules/User/user.data";
import { app } from "../../server";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { User } from "../../modules/User/user.entity";

const user1 = userData.find(user => user.role === 'COACH')!;
const coachToken = signJWT({ name: user1.name, sub: user1.id });
const user2 = userData.find(user => user.role === 'STUDENT')!;
const studentUser = user2;

export const unAuthedTestAgent = supertest.agent(app);

const studentToken = signJWT({ name: studentUser.name, sub: studentUser.id });

export const authedStudentAgent = supertest.agent(app).set('AUTHORIZATION', `Bearer ${studentToken}`).set('Accept', 'application/json');


export const authedCoachAgent = supertest.agent(app).set('AUTHORIZATION', `Bearer ${coachToken}`).set('Accept', 'application/json');

