import {Friend} from '../../domain/entities';
import {CrudRepository} from './CrudRepository';

export interface FriendRepository extends CrudRepository<Friend, string> {}
