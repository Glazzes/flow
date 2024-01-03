import {
  Axios,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {BASE_URL} from '@env';
import {injectable} from 'inversify';

export type HttpResponse<T> = {
  data: T;
  status: number;
  headers: {
    [headerName: string]: any;
  };
};

export interface HttpManager {
  get<T = undefined>(url: string, options?: object): Promise<HttpResponse<T>>;
  post<T = undefined>(
    url: string,
    body: object,
    options?: object,
  ): Promise<HttpResponse<T>>;
  patch<T = undefined>(
    url: string,
    body: object,
    options?: object,
  ): Promise<HttpResponse<T>>;
  delete<T = undefined>(
    url: string,
    options?: object,
  ): Promise<HttpResponse<T>>;
}

class Supplier<T> {
  constructor(private func: () => T) {}

  get(): T {
    return this.func();
  }
}

@injectable()
export default class AxiosHttpManager implements HttpManager {
  private http: Axios = new Axios({baseURL: BASE_URL});

  constructor() {
    this.http.interceptors.request.use(this.handleRequest);
  }

  get<T = undefined>(url: string, options?: object): Promise<HttpResponse<T>> {
    const supplier = new Supplier(() => this.http.get<T>(url, options));
    return this.mapAxiosResponseToHttpResponse<T>(supplier);
  }

  post<T = undefined>(
    url: string,
    body: object,
    options?: object,
  ): Promise<HttpResponse<T>> {
    const supplier = new Supplier(() => this.http.post<T>(url, body, options));
    return this.mapAxiosResponseToHttpResponse(supplier);
  }

  patch<T = undefined>(
    url: string,
    body: object,
    options?: object,
  ): Promise<HttpResponse<T>> {
    const supplier = new Supplier(() => this.http.patch<T>(url, body, options));
    return this.mapAxiosResponseToHttpResponse<T>(supplier);
  }

  delete<T = undefined>(
    url: string,
    options?: object,
  ): Promise<HttpResponse<T>> {
    const supplier = new Supplier(() => this.http.delete<T>(url, options));
    return this.mapAxiosResponseToHttpResponse<T>(supplier);
  }

  private async mapAxiosResponseToHttpResponse<T>(
    supplier: Supplier<Promise<AxiosResponse<T>>>,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await supplier.get();
      return Promise.resolve({
        data: response.data,
        status: response.status,
        headers: response.headers,
      });
    } catch (e) {
      const response = (e as AxiosError<T>).response!!;
      return Promise.resolve({
        data: response.data,
        status: response.status,
        headers: response.headers,
      });
    }
  }

  private handleRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }
}
