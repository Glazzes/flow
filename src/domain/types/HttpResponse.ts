export type HttpResponse<T> = {
  statusCode: number;
  data: T;
  headers?: {
    [id: string]: string;
  };
  cookies?: {
    [id: string]: string;
  };
};
