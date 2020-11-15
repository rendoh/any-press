import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../api/user';
import { UserInfo } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';

export function useUserInfo(id: number) {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo(id)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((error: unknown) => {
        handleApiError(error, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return {
    userInfo,
    isLoading,
  };
}
