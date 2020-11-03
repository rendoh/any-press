import React, { FC, Suspense } from 'react';
import { Loader } from 'rsuite';

const AsyncRoute: FC = ({ children }) => {
  return <Suspense fallback={<Loader center />}>{children}</Suspense>;
};

export default AsyncRoute;
