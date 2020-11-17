import styled from '@emotion/styled';
import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import { useUserArticles } from '../../hooks/api/useUserArticles';
import Avatar from '../core/Avatar';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';
import ArticleList from '../article/ArticleList';
import Pagination from '../core/Pagination';
import PageTitle from '../core/PageTitle';

const UserDetailPage: FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = Number(id);
  const page = Number(searchParams.get('page')) || 1;
  const { userInfo, isLoading: isUserLoading } = useUserInfo(userId);
  const {
    articles,
    isLoading: isArticleLoading,
    total,
    perPage,
  } = useUserArticles(userId, { page });

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

  if (isUserLoading) {
    return <OverlayLoader />;
  }
  if (!userInfo) {
    return (
      <>
        <SEO title="ユーザが見つかりませんでした" />
        <NotFound />
      </>
    );
  }
  return (
    <>
      <SEO title={userInfo.name} />
      <Header>
        <Avatar avatar={userInfo.avatar} size="lg" />
        <Name>{userInfo.name}</Name>
      </Header>
      <ArticleList articles={articles} />
      {isArticleLoading ? (
        <OverlayLoader backdrop={false} />
      ) : (
        <Pagination pages={pageCount} activePage={page} onSelect={goto} />
      )}
    </>
  );
};

export default UserDetailPage;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Name = styled(PageTitle)`
  margin: 0 auto 0 20px;
`;
