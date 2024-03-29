import { useEffect, useState } from 'react';
import { ArticlesParams, fetchMyArticles } from '../../api/article';
import { Article } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useMyArticles({ page }: ArticlesParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchMyArticles({ page })
      .then(({ data }) => {
        setArticles(data.data);
        setPerPage(data.per_page);
        setTotal(data.total);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return {
    articles,
    isLoading,
    perPage,
    total,
  };
}
