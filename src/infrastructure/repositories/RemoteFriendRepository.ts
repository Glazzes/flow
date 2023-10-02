import {inject, injectable} from 'inversify';
import {FriendRepository} from '../../application/repositories';
import {Friend} from '../../domain/entities';
import {HttpService} from '../services';
import {Logger} from '../../domain/log';
import {ConsoleLogger} from '../../application/log';

@injectable()
export default class RemoteFriendRepository implements FriendRepository {
  private readonly http: HttpService;
  private logger: Logger = new ConsoleLogger(RemoteFriendRepository.name);

  constructor(@inject('HttpService') http: HttpService) {
    this.http = http;
  }

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
    throw new Error('Method not implemented.');
  }
}
