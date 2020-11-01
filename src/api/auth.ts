import { User } from '../types/user';
import { apiClient } from './client';

export type LoginValues = {
  email: string;
  password: string;
};

export async function login(values: LoginValues) {
  return apiClient.post<User>('/login', values);
}

export async function logout() {
  return apiClient.post<null>('/logout');
}
