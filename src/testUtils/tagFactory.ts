import { Tag } from '../types/article';

let id = 0;

export function tagFactory(): Tag {
  return {
    id: id++,
    name: 'name',
    slug: 'slug',
  };
}
