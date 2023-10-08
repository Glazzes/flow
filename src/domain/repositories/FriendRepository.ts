import {Friend} from '../entities';
import {CrudRepository} from './CrudRepository';

export interface FriendRepository extends CrudRepository<Friend, string> {}
