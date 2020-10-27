import { LoginFormValues } from '../types/auth';
import { User } from '../types/user';
import { apiClient } from './client';

export async function login(values: LoginFormValues) {
  return apiClient.post<User>('/login', values);
}

export async function logout() {
  return apiClient.post<null>('/logout');
}
