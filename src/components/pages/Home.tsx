import styled from '@emotion/styled';
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon, IconButton } from 'rsuite';
import { useArticles } from '../../hooks/queries/useArticles';
import ArticleList from '../article/ArticleList';
import OverlayLoader from '../core/OverlayLoader';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') ?? '';
  const { articles, isLoading, total, perPage } = useArticles({ page, search });
  const pageCount = Math.ceil(total / perPage);

  const goto = (number: number) => {
    setSearchParams({
      search,
      page: number.toString(),
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({
      search: searchValue,
    });
  };

  const [searchValue, setSearchValue] = useState(search);
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const isPlainHome = page === 1 && !search;

  return (
    <>
      <SEO />
      {isPlainHome && (
        <Hero>
          <Colored>Any</Colored>one can post <Colored>any</Colored>thing at{' '}
          <Colored>any</Colored>time.
        </Hero>
      )}
      <SearchForm onSubmit={handleSubmit}>
        <SearchField
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton type="submit" circle icon={<Icon icon="search" />} />
      </SearchForm>
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

const Hero = styled.h1`
  text-align: center;
  padding: 60px 30px 90px;
  line-height: 1.8;
  @media (max-width: 500px) {
    font-size: 28px;
    padding: 40px 20px 55px;
  }
`;

const Colored = styled.span`
  color: #f44336;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 150px;
  background: #f7f7fa;
  padding: 3px 3px 3px 10px;
  border-radius: 50px;
  margin: 0 0 20px auto;
  transition: width 0.25s ease-out;
  &:focus-within {
    width: 500px;
  }
`;
const SearchField = styled.input`
  border: none;
  padding: 3px 10px;
  width: 100%;
  background: transparent;
  outline: none;
`;
const SearchButton = styled(IconButton)`
  min-width: 36px;
`;
