import { useEffect, useState } from 'react';
import { fetchArticleDetail } from '../../api/article';
import { ArticleDetail } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

export function useArticleDetail(id: number) {
  const [articleDetail, setArticleDetail] = useState<ArticleDetail>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticleDetail(id)
      .then(({ data }) => {
        setArticleDetail(data);
      })
      .catch((error: unknown) => {
        handleApiError(error, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return {
    articleDetail,
    isLoading,
  };
}
