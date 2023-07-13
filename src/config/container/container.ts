import {Container} from 'inversify';
import {FriendRepository} from '../../domain/repositories';
import {HttpService, NotificationService} from '../../domain/services';
import {LocalFriendRepository} from '../../data/repositories';
import {
  AxiosHttpService,
  NotifeeNotificationService,
} from '../../data/services';
import types from './IocTypes';

const container = new Container();

container
  .bind<NotificationService>(types.NotificationService)
  .to(NotifeeNotificationService);

container
  .bind<FriendRepository>(types.FriendRepository)
  .to(LocalFriendRepository);

container.bind<HttpService>(types.HttpService).to(AxiosHttpService);

export default container;
