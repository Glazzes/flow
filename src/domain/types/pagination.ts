export type Page<T> = {
  data: T[];
  elementCount: number;
  totalCount: number;
  isLast: boolean;
};

export type PageRequest = {
  page: number;
  size: number;
  direction: 'asc' | 'desc';
};
