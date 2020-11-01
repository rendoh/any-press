import { ErrorMessages } from '../types/error';

export class ApiError<E extends ErrorMessages = ErrorMessages> extends Error {
  public name = 'ApiError';
  constructor(message: string, public errors: E) {
    super(message);
  }
}
