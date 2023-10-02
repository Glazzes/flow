import {Friend} from '../../domain/entities';
import {FriendRepository} from '../../application/repositories';
import {injectable} from 'inversify';

@injectable()
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

  existsById(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
