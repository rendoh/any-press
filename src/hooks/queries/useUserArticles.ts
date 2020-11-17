import { useEffect, useState } from 'react';
import { ArticlesParams, fetchArticlesByUserId } from '../../api/article';
import { Article } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useUserArticles(userId: number, { page }: ArticlesParams = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesByUserId(userId, { page })
      .then(({ data }) => {
        setArticles(data.data);
        setPerPage(data.per_page);
        setTotal(data.total);
      })
      .catch(handleApiError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, page]);

  return {
    articles,
    isLoading,
    perPage,
    total,
  };
}
