import { User, UserAccount } from '../types/user';
import { apiClient } from './client';

export type UserRegistrationValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export async function registerUser(values: UserRegistrationValues) {
  return apiClient.post<User>('/register', values);
}

export type UserUpdateValues = {
  name: string;
  email: string;
  avatar?: string;
};

export async function fetchUserAccount() {
  return apiClient.get<UserAccount>('/user');
}

export async function updateUser(values: UserUpdateValues) {
  return apiClient.put<UserAccount>('/user', values);
}
