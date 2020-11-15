import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'rsuite';
import { Paths } from '../../constants/paths';
import { UserInfo } from '../../types/user';
import Avatar from '../core/Avatar';

type UserCardProps = {
  userInfo: UserInfo;
  className?: string;
};

const UserCard: FC<UserCardProps> = ({ userInfo, className }) => (
  <Root className={className} to={Paths.home}>
    <Panel bordered>
      <Row>
        <Avatar avatar={userInfo.avatar} />
        <UserName>{userInfo.name}</UserName>
      </Row>
      <ArticleCount>投稿した記事の数: {userInfo.articles_count}</ArticleCount>
    </Panel>
  </Root>
);

export default UserCard;

const Root = styled(Link)`
  display: block;
  text-decoration: none !important;
  color: inherit;
  &:hover > * {
    border-color: #f44336;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.p`
  margin-left: 10px;
`;

const ArticleCount = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 10px;
`;
