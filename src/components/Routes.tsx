import React, { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './pages/Login';

const Routes: FC = () => {
  return useRoutes([
    {
      path: Paths.home,
      element: <div>HOME</div>,
    },
    {
      path: Paths.login,
      element: <Login />,
    },
  ]);
};

export default Routes;

export const Paths = {
  home: '/',
  login: '/login',
} as const;
