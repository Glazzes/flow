import {HttpResponse} from '../types/HttpResponse';

export interface HttpService {
  get<T>(endpoint: string): Promise<HttpResponse<T>>;
  post<T>(endpoint: string): Promise<HttpResponse<T>>;
  patch<T>(endpoint: string): Promise<HttpResponse<T>>;
  delete<T>(endpoint: string): Promise<HttpResponse<T>>;
}
