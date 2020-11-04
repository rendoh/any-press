import { apiClient } from './client';

type UploadedResponse = {
  file_path: string;
};

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post<UploadedResponse>('/upload', formData);
}
