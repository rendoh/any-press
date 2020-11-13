import { Tag } from '../types/article';
import { apiClient } from './client';

export async function fethAllTags() {
  return apiClient.get<Tag[]>('/tags');
}
