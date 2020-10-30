type ErrorMessages = {
  [key in string]: string[];
};

export type ErrorResponse<T extends ErrorMessages = ErrorMessages> = {
  message: string;
  errors: T;
};
