import { useEffect, useState } from 'react';
import { fetchCategoryBySlug } from '../../api/category';
import { Category } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoryBySlug(slug)
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((error: unknown) => {
        handleApiError(error, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  return {
    category,
    isLoading,
  };
}
