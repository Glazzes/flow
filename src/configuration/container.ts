import {Container} from 'inversify';
import {FriendRepository} from '../application/repositories';
import {LocalStorageService, PermissionService} from '../application/services';
import {LocalFriendRepository} from '../infrastructure/repositories';
import {HttpService, SimplePermissionService} from '../infrastructure/services';
import SelectProfileImageViewModel from '../infrastructure/viewmodel/SelectProfileImageViewModel';
import {ContainerTypes} from './containertypes';

const container = new Container();

// View Models
container
  .bind<SelectProfileImageViewModel>(ContainerTypes.SelectProfileImageViewModel)
  .to(SelectProfileImageViewModel);

// Setup all necessary components
container
  .bind<PermissionService>(ContainerTypes.SimplePermissionService)
  .to(SimplePermissionService);

container
  .bind<FriendRepository>('LocalFriendRepository')
  .to(LocalFriendRepository);

container
  .bind<LocalStorageService>('LocalStorageService')
  .to(LocalStorageService);

container.bind<HttpService>('HttpService').to(HttpService);

export default container;
