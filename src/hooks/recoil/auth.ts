import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from '../../types/user';

const authenticatedUserState = atom<User | null>({
  key: 'authenticatedUserState',
  default: window.__INITIAL_DATA__.user,
});

const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => !!get(authenticatedUserState),
});

export function useAuthenticatedUser() {
  return useRecoilValue(authenticatedUserState);
}

export function useIsAuthenticated() {
  return useRecoilValue(isAuthenticatedState);
}

export function useSetAuthenticatedUser() {
  return useSetRecoilState(authenticatedUserState);
}

declare global {
  interface Window {
    __INITIAL_DATA__: {
      user: User | null;
    };
  }
}
