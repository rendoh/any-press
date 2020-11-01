import React, { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Loader from './core/Loader';
const Login = React.lazy(() => import('./pages/Login'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const Routes: FC = () => {
  return useRoutes([
    {
      path: Paths.home,
      element: <div>HOME</div>,
    },
    {
      path: Paths.login,
      element: (
        <AsyncRoute>
          <Login />
        </AsyncRoute>
      ),
    },
    {
      path: '*',
      element: (
        <AsyncRoute>
          <NotFound />
        </AsyncRoute>
      ),
    },
  ]);
};

export default Routes;

const AsyncRoute: FC = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export const Paths = {
  home: '/',
  login: '/login',
} as const;
