import {injectable} from 'inversify';
import {Logger} from '../../domain/log';
import {NotificationService} from '@domain/services';
import {ConsoleLogger} from '@domain/log';

@injectable()
export default class NotifeeNotiicationService
  implements NotificationService<string>
{
  private logger: Logger = new ConsoleLogger(NotifeeNotiicationService.name);

  updateNotification(id: string, options: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  notify(): Promise<string> {
    this.logger.info('Sending a notification');
    throw new Error('Method not implemented.');
  }
}
