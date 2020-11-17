import { useEffect, useState } from 'react';
import { ArticlesParams, fetchArticlesByCategorySlug } from '../../api/article';
import { Article } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useCategoryArticles(
  slug: string,
  { page }: ArticlesParams = {},
) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage, setPerPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchArticlesByCategorySlug(slug, { page })
      .then(({ data }) => {
        setArticles(data.data);
        setPerPage(data.per_page);
        setTotal(data.total);
      })
      .catch((error: unknown) => {
        handleApiError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, page]);

  return {
    articles,
    isLoading,
    perPage,
    total,
  };
}
