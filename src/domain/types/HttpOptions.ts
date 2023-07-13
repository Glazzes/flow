import {HttpFormData} from './HttpFormData';

export type HttpOptions = {
  body: any | HttpFormData;
  params: {
    [id: string]: string;
  };
  headers: {
    [id: string]: string;
  };
};
