import {AuthenticationService, LocalStorageService} from '@domain/services';
import {inject, injectable} from 'inversify';

@injectable()
export default class Oauth2AuthenticationService
  implements AuthenticationService
{
  constructor(
    @inject('LocalStorageService') localStorage: LocalStorageService,
  ) {}

  async login<T>(_: T): Promise<void> {
    console.log('Hello world');
  }

  async logout(): Promise<void> {}
}
