import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { ArticleValues, updateArticle } from '../../api/article';
import { ArticleDetail } from '../../types/article';
import { handleApiError } from '../../utils/handleApiError';

type UpdateArticleOption = {
  onSuccess?: (articleDetail: ArticleDetail) => void;
  onError?: (errors: ErrorEntry<keyof ArticleValues>[]) => void;
};

export function useUpdateArticle({
  onSuccess,
  onError,
}: UpdateArticleOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateArticle = async (id: number, values: ArticleValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await updateArticle(id, values);
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
    updateArticle: handleUpdateArticle,
    isSubmitting,
  };
}
