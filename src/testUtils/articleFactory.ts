import { Article } from '../types/article';
import { categoryFactory } from './categoryFactory';
import { tagFactory } from './tagFactory';
import { userFactory } from './userFactory';

let id = 1;

export function articleFactory(): Article {
  return {
    id: id++,
    title: 'title',
    excerpt: 'excerpt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    public: true,
    user: userFactory(),
    category: categoryFactory(),
    tags: [tagFactory()],
  };
}
