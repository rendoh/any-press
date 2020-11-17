import { useCallback, useEffect, useState } from 'react';
import { Tag } from '../../types/article';
import { fethAllTags } from '../../api/tag';
import { handleApiError } from '../../utils/handleApiError';

type Option = {
  disableInitialFetch?: boolean;
};

export function useTags({ disableInitialFetch = false }: Option = {}) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(!disableInitialFetch);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    return fethAllTags()
      .then(({ data }) => {
        setTags(data);
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
    tags,
    isLoading,
    refetch,
  };
}
