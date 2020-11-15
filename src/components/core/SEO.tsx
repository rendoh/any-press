import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const appName = 'sbox';

type SEOProps = {
  title?: string;
};

const SEO: FC<SEOProps> = ({ title }) => (
  <Helmet title={title ? `${title} | ${appName}` : appName} />
);

export default SEO;
