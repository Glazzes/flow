import {Friend} from '../entities/Friend';
import {CrudRepository} from './CrudRepository';

export interface FriendRepository extends CrudRepository<string, Friend> {}
