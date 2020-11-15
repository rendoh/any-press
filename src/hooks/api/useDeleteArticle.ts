import { useState } from 'react';
import { Alert } from 'rsuite';
import { deleteArticle } from '../../api/article';
import { handleApiError } from '../../utils/handleApiError';

type DeleteArticleOption = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useDeleteArticle({
  onSuccess,
  onError,
}: DeleteArticleOption = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteArticle = async (id: number) => {
    setIsSubmitting(true);
    try {
      await deleteArticle(id);
      Alert.success('記事を削除しました');
      if (onSuccess) onSuccess();
    } catch (error) {
      handleApiError(error);
      if (onError) onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    deleteArticle: handleDeleteArticle,
    isSubmitting,
  };
}
