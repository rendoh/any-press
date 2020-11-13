import { useEffect, useState } from 'react';
import { fetchUserAccount } from '../../api/user';
import { UserAccount } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';

export function useUserAccount() {
  const [userAccount, setUserAccount] = useState<UserAccount>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserAccount()
      .then(({ data }) => {
        setUserAccount(data);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    userAccount,
  };
}
