import { User } from './user';

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type Article = {
  id: number;
  title: string;
  image?: string;
  public: boolean;
  user: User;
  category: Category;
  tags: Tag[];
  created_at: string;
  updated_at: string;
  excerpt: string;
};

export type ArticleDetail = Article & {
  html: string;
};
