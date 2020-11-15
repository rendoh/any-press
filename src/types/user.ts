export type User = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  avatar?: string;
};

export type UserInfo = User & {
  articles_count: number;
};

export type UserAccount = User & {
  email: string;
};
