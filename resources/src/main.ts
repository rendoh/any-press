import axios from "axios";

const apiClient = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  }
});

type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type UserRegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

function createUser(values: UserRegistrationFormValues) {
  return apiClient.post<User>("/api/v1/register", values);
}
