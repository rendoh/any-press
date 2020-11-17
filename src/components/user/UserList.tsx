import styled from '@emotion/styled';
import React, { FC } from 'react';
import { UserInfo } from '../../types/user';
import UserCard from './UserCard';

type UserListProps = {
  userInfos: UserInfo[];
  emptyText?: string | false;
};

const UserList: FC<UserListProps> = ({
  userInfos,
  emptyText = 'ユーザが見つかりませんでした',
}) =>
  userInfos.length === 0 ? (
    emptyText ? (
      <EmptyText>{emptyText}</EmptyText>
    ) : null
  ) : (
    <Root>
      {userInfos.map((userInfo) => (
        <UserCard key={userInfo.id} userInfo={userInfo} />
      ))}
    </Root>
  );

export default UserList;

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyText = styled.p`
  text-align: center;
  padding: 80px 20px;
`;
