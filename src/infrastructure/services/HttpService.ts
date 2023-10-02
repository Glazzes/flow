import {Axios, AxiosRequestConfig, AxiosResponse} from 'axios';
import {inject, injectable} from 'inversify';
import LocalStorageService from '../../application/services/LocalStorageService';

@injectable()
export default class HttpService {
  private axios: Axios = new Axios({baseURL: 'SomeUrl'});

  constructor(
    @inject('LocalStorageService') localStorage: LocalStorageService,
  ) {
    this.attachAuthorizationHeaderRequestInterceptor();
  }

  get<T = undefined>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(endpoint);
  }

  post<T = undefined, B = any>(
    endpoint: string,
    data?: B,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(endpoint, data, config);
  }

  patch<T = undefined>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(endpoint);
  }

  delete<T = undefined>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(endpoint);
  }

  private attachAuthorizationHeaderRequestInterceptor(): void {
    this.axios.interceptors.request.use(config => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken !== null) {
        config.headers.setAuthorization('Bearer Token', false);
      }

      return config;
    });
  }
}
