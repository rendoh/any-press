import React, { FC } from 'react';
import { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import Home from '../pages/Home';
import AsyncRoute from './AsyncRoute';
import PrivateRoute from './PrivateRoute';

const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const AccountSettings = React.lazy(() => import('../pages/AccountSettings'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const publicRoutes: PartialRouteObject[] = [
  {
    path: Paths.home,
    element: <Home />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const privateRoutes: PartialRouteObject[] = [
  {
    path: Paths.accountSettings,
    element: <AccountSettings />,
  },
];

const Routes: FC = () => {
  const _privateRoutes = privateRoutes.map((route) => ({
    ...route,
    element: <PrivateRoute>{route.element}</PrivateRoute>,
  }));

  const routes = [...publicRoutes, ..._privateRoutes].map((route) => ({
    ...route,
    element: <AsyncRoute>{route.element}</AsyncRoute>,
  }));
  return useRoutes(routes);
};

export default Routes;
