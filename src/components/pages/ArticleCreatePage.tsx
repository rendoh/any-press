import React, { FC } from 'react';
import ArticleEditor from '../article/ArticleEditor';
import SEO from '../core/SEO';
import PageTitle from '../core/PageTitle';

const ArticleCreatePage: FC = () => {
  return (
    <>
      <SEO title="新規記事作成" />
      <PageTitle>新規記事作成</PageTitle>
      <ArticleEditor />
    </>
  );
};

export default ArticleCreatePage;
