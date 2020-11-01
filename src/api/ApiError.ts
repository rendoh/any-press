import { ErrorFields } from '../types/error';

export class ApiError<E extends ErrorFields = ErrorFields> extends Error {
  public name = 'ApiError';
  constructor(message: string, public fields: E & ErrorFields) {
    super(message);
  }

  public getFieldErrorMessages() {
    return Object.values(this.fields)
      .filter((fieldErrors): fieldErrors is string | string[] => !!fieldErrors)
      .flatMap((fieldErrors) => fieldErrors);
  }

  public getFieldErrorEntries<T extends string>(keys: T[]): [T, string][] {
    return Object.entries(this.fields)
      .filter((field): field is [T, string | string[]] => {
        const [key, values] = field;
        return keys.includes(key as T) && !!values && values.length > 0;
      })
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]);
  }
}
