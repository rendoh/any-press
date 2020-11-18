import { useEffect, useState } from 'react';
import { fetchArticles, SearchArticleParams } from '../../api/article';
import { Article } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useArticles({ page, search }: SearchArticleParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles({ page, search })
      .then(({ data }) => {
        setArticles(data.data);
        setPerPage(data.per_page);
        setTotal(data.total);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, search]);

  return {
    articles,
    isLoading,
    perPage,
    total,
  };
}
