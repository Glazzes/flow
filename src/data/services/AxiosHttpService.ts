import {injectable} from 'inversify';
import {HttpService} from '../../domain/services';
import {HttpResponse} from '../../domain/types/HttpResponse';

@injectable()
export default class AxiosHttpService implements HttpService {
  constructor() {
    console.log('Axios setup');
  }

  get<T>(endpoint: string): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  post<T>(endpoint: string): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  patch<T>(endpoint: string): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }

  delete<T>(endpoint: string): Promise<HttpResponse<T>> {
    throw new Error('Method not implemented.');
  }
}
