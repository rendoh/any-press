export type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type UserAccount = User & {
  email: string;
};
