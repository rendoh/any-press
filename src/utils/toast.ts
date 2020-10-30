import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../types/error';

export function toastErrorResponse(
  error: AxiosError<Partial<ErrorResponse>> | Error,
) {
  const errorMessage =
    ('isAxiosError' in error &&
      error.isAxiosError &&
      error.response &&
      error.response.data.message) ||
    'エラーが発生しました';

  toast.error(errorMessage);
}
