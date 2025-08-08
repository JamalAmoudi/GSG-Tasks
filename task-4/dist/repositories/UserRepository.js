"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const users = [
    { id: 1, name: 'Ali', email: 'ali@email.com' },
    { id: 2, name: 'Sara', email: 'sara@email.com' }
];
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(users);
    }
}
exports.UserRepository = UserRepository;
