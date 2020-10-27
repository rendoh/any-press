import { User, UserRegistrationFormValues } from '../types/user';
import { apiClient } from './client';

export async function registerUser(values: UserRegistrationFormValues) {
  return apiClient.post<User>('/register', values);
}
