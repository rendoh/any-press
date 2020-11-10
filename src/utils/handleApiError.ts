import { Alert } from 'rsuite';
import { ApiError } from '../api/ApiError';

export function handleApiError(error: unknown) {
  let errors: string[] = [];
  if (error instanceof ApiError) {
    errors = error.getFieldErrorMessages();
  }
  if (errors.length === 0) {
    errors.push('エラーが発生しました');
  }
  errors.forEach((message) => {
    Alert.error(message);
  });
}
