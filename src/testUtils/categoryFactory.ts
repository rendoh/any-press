import { Category } from '../types/article';

let id = 1;

export function categoryFactory(): Category {
  return {
    id: id++,
    name: 'name',
    slug: 'slug',
  };
}
