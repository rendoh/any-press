import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { Paths } from '../../constants/paths';

const PrivateRoute: FC = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname } = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={Paths.login} replace state={{ from: pathname }} />
  );
};

export default PrivateRoute;
