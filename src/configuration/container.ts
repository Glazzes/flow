import {Container} from 'inversify';
import {FriendRepository} from '../application/repositories';
import {
  NotificationService,
  LocalStorageService,
} from '../application/services';
import {LocalFriendRepository} from '../infrastructure/repositories';
import {
  HttpService,
  NotifeeNotificationService,
} from '../infrastructure/services';

const container = new Container();

// Setup all necessary components
container
  .bind<NotificationService>('NotifeeNotificationService')
  .to(NotifeeNotificationService);

container
  .bind<FriendRepository>('LocalFriendRepository')
  .to(LocalFriendRepository);

container
  .bind<LocalStorageService>('LocalStorageService')
  .to(LocalStorageService);

container.bind<HttpService>('HttpService').to(HttpService);

export default container;
