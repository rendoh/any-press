import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { updateUser, UpdateUserValues } from '../../api/user';
import { UserAccount } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';
import { useSetAuthenticatedUser } from '../recoil/auth';

type UpdateUserOption = {
  onSuccess?: (user: UserAccount) => void;
  onError?: (errors: ErrorEntry<keyof UpdateUserValues>[]) => void;
};

export function useUpdateUser({ onSuccess, onError }: UpdateUserOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuthenticatedUser = useSetAuthenticatedUser();

  const handleUpdateUser = async (values: UpdateUserValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await updateUser(values);
      setAuthenticatedUser(data);
      if (onSuccess) onSuccess(data);
    } catch (error: unknown) {
      handleApiError(error);
      if (onError && error instanceof ApiError) {
        onError(error.getFieldErrorEntries(['name', 'email', 'avatar']));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    updateUser: handleUpdateUser,
    isSubmitting,
  };
}
