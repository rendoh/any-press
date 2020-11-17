import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../../hooks/api/useUsers';
import OverlayLoader from '../core/OverlayLoader';
import PageTitle from '../core/PageTitle';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';
import UserList from '../user/UserList';

const UsersPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { users, isLoading, total, perPage } = useUsers({ page });
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
    <div>
      <SEO title="ユーザ一覧" />
      <PageTitle>ユーザ一覧</PageTitle>
      <UserList userInfos={users} />
      {isLoading ? (
        <OverlayLoader />
      ) : (
        <Pagination pages={pageCount} activePage={page} onSelect={goto} />
      )}
    </div>
  );
};

export default UsersPage;
