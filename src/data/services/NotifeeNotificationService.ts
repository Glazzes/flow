import {injectable} from 'inversify';
import {NotificationService} from '../../domain/services';

@injectable()
export default class NotifeeNotiicationService implements NotificationService {
  notify(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
