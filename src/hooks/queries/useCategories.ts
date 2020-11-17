import { useCallback, useEffect, useState } from 'react';
import { Category } from '../../types/article';
import { fethAllCategories } from '../../api/category';
import { handleApiError } from '../../utils/handleApiError';

type Option = {
  disableInitialFetch?: boolean;
};

export function useCategories({ disableInitialFetch = false }: Option = {}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(!disableInitialFetch);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    return fethAllCategories()
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (disableInitialFetch) {
      return;
    }
    refetch();
  }, [disableInitialFetch, refetch]);

  return {
    categories,
    isLoading,
    refetch,
  };
}
