import { useEffect, useState } from 'react';
import { fetchArticles, ArticlesParams } from '../../api/article';
import { Article } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useArticles({ page }: ArticlesParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchArticles({ page })
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
