import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { login, LoginValues } from '../../api/auth';
import { User } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';
import { useSetAuthenticatedUser } from '../recoil/auth';

type LoginOption = {
  onSuccess?: (user: User) => void;
  onError?: (errors: ErrorEntry<keyof LoginValues>[]) => void;
};

export function useLogin({ onSuccess, onError }: LoginOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const handleLogin = async (values: LoginValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await login(values);
      setAuthenticatedUser(data);
      if (onSuccess) onSuccess(data);
    } catch (error: unknown) {
      handleApiError(error);
      if (onError && error instanceof ApiError) {
        onError(error.getFieldErrorEntries(['email', 'password']));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    login: handleLogin,
    isSubmitting,
  };
}
