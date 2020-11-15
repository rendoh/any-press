import React, { FC } from 'react';
import NotFound from '../core/NotFound';
import SEO from '../core/SEO';

const NotFoundPage: FC = () => {
  return (
    <>
      <SEO title="ページが見つかりませんでした" />
      <NotFound />
    </>
  );
};

export default NotFoundPage;
