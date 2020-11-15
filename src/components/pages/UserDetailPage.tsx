import styled from '@emotion/styled';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../hooks/api/useUserInfo';
import Avatar from '../core/Avatar';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';

const UserDetailPage: FC = () => {
  const { id } = useParams();
  const { userInfo, isLoading } = useUserInfo(Number(id));

  if (isLoading) {
    return <OverlayLoader backdrop={false} />;
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
    </>
  );
};

export default UserDetailPage;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Name = styled.h1`
  margin: 0 auto 0 20px;
`;
