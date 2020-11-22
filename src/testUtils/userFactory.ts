import { User } from '../types/user';

let id = 1;

export function userFactory(): User {
  return {
    id: id++,
    name: 'name',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
