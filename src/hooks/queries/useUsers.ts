import { useEffect, useState } from 'react';
import { fetchUsers, UsersParams } from '../../api/user';
import { UserInfo } from '../../types/user';
import { handleApiError } from '../../utils/handleApiError';

export function useUsers({ page }: UsersParams = {}) {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers({ page })
      .then(({ data }) => {
        setUsers(data.data);
        setPerPage(data.per_page);
        setTotal(data.total);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return {
    users,
    isLoading,
    perPage,
    total,
  };
}
