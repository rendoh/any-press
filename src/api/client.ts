import axios, { AxiosError } from 'axios';
import { ErrorMessages } from '../resources/messages';
import { ErrorFields, ErrorResponse } from '../types/error';
import { ApiError } from './ApiError';

export const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

/**
 * 発生したエラーを ApiError に変換して投げる
 */
apiClient.interceptors.response.use(undefined, (e: unknown) => {
  let message = ErrorMessages.connection;
  let fields: ErrorFields = {};
  if (e instanceof Error && 'isAxiosError' in e) {
    const error: AxiosError<ErrorResponse> = e;
    message = error.response?.data.message ?? message;
    fields = error.response?.data.errors ?? fields;
  }
  throw new ApiError(message, fields);
});
