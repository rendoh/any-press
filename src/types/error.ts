export type ErrorMessages<K extends string = string, V = string[]> = Partial<
  Record<K, V>
>;
export type ErrorResponse<T = ErrorMessages> = {
  message?: string;
  errors?: T;
};
