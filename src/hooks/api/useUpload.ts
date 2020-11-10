import { useState } from 'react';
import { ApiError, ErrorEntry } from '../../api/ApiError';
import { uploadImage } from '../../api/upload';
import { handleApiError } from '../../utils/handleApiError';

type UploadOption = {
  onSuccess?: (filePath: string) => void;
  onError?: (errors: ErrorEntry<'file'>[]) => void;
};

export function useUpload({ onSuccess, onError }: UploadOption = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const { data } = await uploadImage(file);
      if (onSuccess) onSuccess(data.file_path);
    } catch (error: unknown) {
      handleApiError(error);
      if (onError && error instanceof ApiError) {
        onError(error.getFieldErrorEntries(['file']));
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload: handleUpload,
    isUploading,
  };
}
