import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { registerUser, RegisterUserValues } from '../../api/user';
import { User } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';
import { useSetAuthenticatedUser } from '../recoil/auth';

type RegisterOption = {
  onSuccess?: (user: User) => void;
  onError?: (errors: ErrorEntry<keyof RegisterUserValues>[]) => void;
};

export function useRegister({ onSuccess, onError }: RegisterOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const handleRegister = async (values: RegisterUserValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await registerUser(values);
      setAuthenticatedUser(data);
      if (onSuccess) onSuccess(data);
    } catch (error: unknown) {
      handleApiError(error);
      if (onError && error instanceof ApiError) {
        onError(
          error.getFieldErrorEntries([
            'name',
            'email',
            'password',
            'password_confirmation',
          ]),
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register: handleRegister,
    isSubmitting,
  };
}
