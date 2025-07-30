"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const bookings = [
    { id: 1, userId: 1, courseId: 2, date: new Date('2024-01-01') },
    { id: 2, userId: 2, courseId: 1, date: new Date('2024-02-15') }
];
class BookingRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(bookings);
    }
}
exports.BookingRepository = BookingRepository;
