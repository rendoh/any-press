import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArticles } from '../../hooks/api/useArticles';
import ArticleList from '../article/ArticleList';
import OverlayLoader from '../core/OverlayLoader';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { articles, isLoading, total, perPage } = useArticles({ page });
  const pageCount = Math.ceil(total / perPage);
  const goto = (number: number) => {
    setSearchParams({
      page: number.toString(),
    });
  };

  return (
    <>
      <SEO />
      {isLoading ? (
        <OverlayLoader />
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination pages={pageCount} activePage={page} onSelect={goto} />
        </>
      )}
    </>
  );
};

export default Home;
