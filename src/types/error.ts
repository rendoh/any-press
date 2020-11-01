export type ErrorFields<
  K extends string = string,
  V = string | string[]
> = Partial<Record<K, V>>;

export type ErrorResponse<T = ErrorFields> = {
  message?: string;
  errors?: T;
};
