import { PaginationResponse } from '../types/api';
import { Article, ArticleDetail } from '../types/article';
import { apiClient } from './client';

export type ArticlesParams = {
  page?: number;
};

export async function fetchArticles(params?: ArticlesParams) {
  return apiClient.get<PaginationResponse<Article>>('/articles', {
    params,
  });
}

export async function fetchArticleDetail(id: number) {
  return apiClient.get<ArticleDetail>(`/articles/${id}`);
}
