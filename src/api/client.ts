import axios, { AxiosError } from 'axios';
import { ErrorMessages, ErrorResponse } from '../types/error';
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
  let message = 'エラーが発生しました';
  let errors: ErrorMessages = {};
  if (e instanceof Error && 'isAxiosError' in e) {
    const error: AxiosError<ErrorResponse> = e;
    message = error.response?.data.message ?? message;
    errors = error.response?.data.errors ?? errors;
  }
  throw new ApiError(message, errors);
});
