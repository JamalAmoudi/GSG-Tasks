"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./repositories/UserRepository");
const CourseRepository_1 = require("./repositories/CourseRepository");
const BookingRepository_1 = require("./repositories/BookingRepository");
async function main() {
    const userRepo = new UserRepository_1.UserRepository();
    const courseRepo = new CourseRepository_1.CourseRepository();
    const bookingRepo = new BookingRepository_1.BookingRepository();
    console.log('All Users:', await userRepo.getAll());
    await userRepo.create({ id: 3, name: 'Jamal', email: 'jamal@email.com' });
    console.log('Jamal is Added :', await userRepo.getAll());
    console.log('Find User By ID :', await userRepo.getById(3));
    await userRepo.update(3, { name: 'Jamal El-Amoudi' });
    console.log('After Update:', await userRepo.getById(1));
    console.log('Filtered User:', await userRepo.filterBy({ name: 'Jamal El-Amoudi' }));
    await userRepo.delete(1);
    console.log('After Deletion:', await userRepo.getAll());
    console.log('Courses:', await courseRepo.getAll());
    console.log('Bookings:', await bookingRepo.getAll());
}
main();
