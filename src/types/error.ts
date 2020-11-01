export type ErrorFields<K extends string = string, V = string[]> = Partial<
  Record<K, V>
>;
export type ErrorResponse<T = ErrorFields> = {
  message?: string;
  errors?: T;
};
