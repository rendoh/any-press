import { Category } from '../types/article';
import { apiClient } from './client';

export async function fethAllCategories() {
  return apiClient.get<Category[]>('/categories');
}
