"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const courses = [
    { id: "IT-2020-summer", title: 'TypeScript Basics', price: 99 },
    { id: "IT-2023-bootcamp", title: 'Advanced JS', price: 149 }
];
class CourseRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(courses);
    }
}
exports.CourseRepository = CourseRepository;
