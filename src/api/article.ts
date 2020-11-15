import { PaginationParams, PaginationResponse } from '../types/api';
import { Article, ArticleDetail } from '../types/article';
import { apiClient } from './client';

export type ArticlesParams = PaginationParams;

export async function fetchArticles(params?: ArticlesParams) {
  return apiClient.get<PaginationResponse<Article>>('/articles', {
    params,
  });
}

export async function fetchArticlesByUserId(
  userId: number,
  params?: ArticlesParams,
) {
  return apiClient.get<PaginationResponse<Article>>(
    `/users/${userId}/articles`,
    {
      params,
    },
  );
}

export async function fetchArticleDetail(id: number) {
  return apiClient.get<ArticleDetail>(`/articles/${id}`);
}

export type ArticleValues = {
  title: string;
  image?: string;
  content: string;
  category_id: number;
  tags?: number[];
};
export async function createArticle(values: ArticleValues) {
  return apiClient.post<ArticleDetail>('/articles', values);
}

export async function updateArticle(id: number, values: ArticleValues) {
  return apiClient.put<ArticleDetail>(`/articles/${id}`, values);
}

export async function deleteArticle(id: number) {
  return apiClient.delete<null>(`/articles/${id}`);
}
