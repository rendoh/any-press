import { Alert } from 'rsuite';
import { ApiError } from '../api/ApiError';

export function handleApiError(error: unknown) {
  let errors: string[] = [];
  if (error instanceof ApiError) {
    if (error.status === 404) {
      errors.push('見つかりませんでした');
    } else if (error.status === 401) {
      errors.push('認証が必要です');
    } else if (error.status === 403) {
      errors.push('権限がありません');
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
