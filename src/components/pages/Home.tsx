import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'rsuite';
import { useArticles } from '../../hooks/api/useArticles';
import ArticleList from '../article/ArticleList';
import OverlayLoader from '../core/OverlayLoader';
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
    document.body.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };

  const [paginationSize, setPaginationSize] = useState<'md' | 'xs'>('md');
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 580px)');
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setPaginationSize(matches ? 'xs' : 'md');
    };
    mql.addEventListener('change', handleChange);
    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <SEO />
      <ArticleList articles={articles} />
      <PaginationWrapper>
        <Pagination
          maxButtons={5}
          pages={pageCount}
          activePage={page}
          onSelect={goto}
          next
          prev
          boundaryLinks
          ellipsis
          size={paginationSize}
        />
      </PaginationWrapper>
      {isLoading && <OverlayLoader backdrop={false} />}
    </>
  );
};

export default Home;

const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;
