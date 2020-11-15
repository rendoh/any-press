import { Tag } from '../types/article';
import { apiClient } from './client';

export async function fethAllTags() {
  return apiClient.get<Tag[]>('/tags');
}

export async function fetchTagBySlug(slug: string) {
  return apiClient.get<Tag>(`/tags/${slug}`);
}
