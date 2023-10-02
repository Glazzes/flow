import {
  AuthenticationService,
  LocalStorageService,
} from '../../application/services';
import {inject, injectable} from 'inversify';
import HttpService from './HttpService';

@injectable()
export default class Oauth2AuthenticationService
  implements AuthenticationService
{
  constructor(
    @inject('HttpService') httpService: HttpService,
    @inject('LocalStorageService') localStorage: LocalStorageService,
  ) {}

  async attemptAuthentication<T>(_: T): Promise<void> {
    console.log('Hello world');
  }
}
