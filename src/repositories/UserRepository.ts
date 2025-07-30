import { User } from '../models/userModel';
import { BaseRepository } from './BaseRepository';

const users: User[] = [
  { id: 1, name: 'Ali', email: 'ali@email.com' },
  { id: 2, name: 'Sara', email: 'sara@email.com' }
];



export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(users);
  }
}
