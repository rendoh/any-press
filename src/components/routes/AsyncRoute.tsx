import React, { FC, Suspense } from 'react';
import Loader from '../core/Loader';

const AsyncRoute: FC = ({ children }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default AsyncRoute;
