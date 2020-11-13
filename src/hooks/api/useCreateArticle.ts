import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { ArticleValues, createArticle } from '../../api/article';
import { ArticleDetail } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

type CreateArticleOption = {
  onSuccess?: (articleDetail: ArticleDetail) => void;
  onError?: (errors: ErrorEntry<keyof ArticleValues>[]) => void;
};

export function useCreateArticle({
  onSuccess,
  onError,
}: CreateArticleOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateArticle = async (values: ArticleValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await createArticle(values);
      if (onSuccess) onSuccess(data);
    } catch (error) {
      handleApiError(error);
      if (onError && error instanceof ApiError) {
        onError(
          error.getFieldErrorEntries([
            'title',
            'image',
            'content',
            'category_id',
            'tags',
          ]),
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createArticle: handleCreateArticle,
    isSubmitting,
  };
}
