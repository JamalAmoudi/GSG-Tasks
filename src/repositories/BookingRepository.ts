import { Booking } from '../models/bookingModel';
import { BaseRepository } from './BaseRepository';

const bookings: Booking[] = [
  { id: 1, userId: 1, courseId: 2, date: new Date('2024-01-01') },
  { id: 2, userId: 2, courseId: 1, date: new Date('2024-02-15') }
];

export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super(bookings);
  }
}
