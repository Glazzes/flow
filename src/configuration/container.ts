import {Container} from 'inversify';
import {FriendRepository} from '@domain/repositories';
import {PermissionService, LocalStorageService} from '@domain/services';
import {LocalFriendRepository} from '@data/repositories';
import {SimplePermissionService} from '@data/services';
import SelectProfileImageViewModel from '@ui/screens/profile/viewModel';
import {AxiosHttpManager, HttpManager} from '@data/network';

const container = new Container();

// View Models
container
  .bind<SelectProfileImageViewModel>('SelectProfileImageViewModel')
  .to(SelectProfileImageViewModel);

// Repositories
container.bind<FriendRepository>('FriendRepository').to(LocalFriendRepository);

// Services
container
  .bind<PermissionService>('PermissionService')
  .to(SimplePermissionService)
  .inSingletonScope();

container
  .bind<LocalStorageService>('LocalStorageService')
  .to(LocalStorageService);

container.bind<HttpManager>('HttpManager').to(AxiosHttpManager);

export default container;
