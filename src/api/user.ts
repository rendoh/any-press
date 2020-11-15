import { PaginationResponse } from '../types/api';
import { User, UserAccount, UserInfo } from '../types/user';
import { apiClient } from './client';

export type UsersParams = {
  page?: number;
};

export async function fetchUsers(params?: UsersParams) {
  return apiClient.get<PaginationResponse<UserInfo>>('/users', {
    params,
  });
}

export async function fetchUserInfo(id: number) {
  return apiClient.get<UserInfo>(`/users/${id}`);
}

export type RegisterUserValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export async function registerUser(values: RegisterUserValues) {
  return apiClient.post<User>('/register', values);
}

export type UpdateUserValues = {
  name: string;
  email: string;
  avatar?: string;
};

export async function fetchUserAccount() {
  return apiClient.get<UserAccount>('/user');
}

export async function updateUser(values: UpdateUserValues) {
  return apiClient.put<UserAccount>('/user', values);
}
