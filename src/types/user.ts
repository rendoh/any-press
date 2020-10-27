export type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type UserRegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
