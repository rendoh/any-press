import { useEffect, useState } from 'react';
import { fetchTagBySlug } from '../../api/tag';
import { Tag } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useTag(slug: string) {
  const [tag, setTag] = useState<Tag>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTagBySlug(slug)
      .then(({ data }) => {
        setTag(data);
      })
      .catch((error: unknown) => {
        handleApiError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  return {
    tag,
    isLoading,
  };
}
