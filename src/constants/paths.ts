export const Paths = {
  home: '/',
  login: '/login',
  register: '/register',
  accountSettings: '/account',
  articleCreate: '/articles/new',
  articleDetail: <T extends number | string = number>(id: T) =>
    `/articles/${id}`,
  articleEdit: <T extends number | string = number>(id: T) =>
    `/articles/${id}/edit`,
  users: '/users',
} as const;
