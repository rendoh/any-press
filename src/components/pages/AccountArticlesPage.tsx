import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMyArticles } from '../../hooks/api/useMyArticles';
import ArticleList from '../article/ArticleList';
import OverlayLoader from '../core/OverlayLoader';
import PageTitle from '../core/PageTitle';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';

const AccountArticlesPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { articles, isLoading, total, perPage } = useMyArticles({ page });
  const pageCount = Math.ceil(total / perPage);
  const goto = (number: number) => {
    setSearchParams({
      page: number.toString(),
    });
    document.body.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };
  return (
    <>
      <SEO title="投稿した記事一覧" />
      <PageTitle>投稿した記事一覧</PageTitle>
      <ArticleList articles={articles} />
      {isLoading ? (
        <OverlayLoader backdrop={false} />
      ) : (
        <Pagination pages={pageCount} activePage={page} onSelect={goto} />
      )}
    </>
  );
};

export default AccountArticlesPage;
