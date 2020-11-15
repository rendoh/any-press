export type PaginationResponse<T> = {
  data: T[];
  total: number;
  per_page: number;
};

export type PaginationParams = {
  page?: number;
};
