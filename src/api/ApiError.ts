import { ErrorFields } from '../types/error';

export class ApiError<E extends ErrorFields = ErrorFields> extends Error {
  public name = 'ApiError';
  public messages: string[] = [];
  constructor(message: string, public fields: E) {
    super(message);
    this.messages = Object.values(this.fields)
      .filter((fieldErrors): fieldErrors is string[] => !!fieldErrors)
      .flatMap((fieldErrors) => fieldErrors);
  }
}
