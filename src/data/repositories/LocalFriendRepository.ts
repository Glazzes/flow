import {Friend} from '../../domain/entities/Friend';
import {FriendRepository} from '../../domain/repositories';

export default class LocalFriendRepository implements FriendRepository {
  save(entity: Friend): Promise<Friend> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Friend> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
