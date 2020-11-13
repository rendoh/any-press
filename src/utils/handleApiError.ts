import { Alert } from 'rsuite';
import { ApiError } from '../api/ApiError';

export function handleApiError(error: unknown, ignore404 = false) {
  let errors: string[] = [];
  if (error instanceof ApiError) {
    if (ignore404 && error.status === 404) {
      return;
    }

    errors = error.getFieldErrorMessages();
  }
  if (errors.length === 0) {
    errors.push('エラーが発生しました');
  }
  errors.forEach((message) => {
    Alert.error(message);
  });
}
