import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader, Pagination } from 'rsuite';
import { useArticles } from '../../hooks/api/useArticles';
import ArticleList from '../article/ArticleList';

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

  return isLoading ? (
    <Loader center />
  ) : (
    <Container>
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
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 20px;
`;

const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;
