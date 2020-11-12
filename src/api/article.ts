import { PaginationResponse } from '../types/api';
import { Article } from '../types/article';
import { apiClient } from './client';

export type ArticlesParams = {
  page?: number;
};

export async function fetchArticles(params?: ArticlesParams) {
  return apiClient.get<PaginationResponse<Article>>('/articles', {
    params,
  });
}
