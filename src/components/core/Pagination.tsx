import styled from '@emotion/styled';
import React, { FC, useEffect, useState } from 'react';
import {
  Pagination as RsuitePagination,
  PaginationProps as RsuitePaginationProps,
} from 'rsuite';

type PaginationProps = Pick<
  RsuitePaginationProps,
  'activePage' | 'pages' | 'onSelect'
>;

const Pagination: FC<PaginationProps> = ({ activePage, pages, onSelect }) => {
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
    <PaginationWrapper>
      <RsuitePagination
        maxButtons={5}
        pages={pages}
        activePage={activePage}
        onSelect={onSelect}
        next
        prev
        boundaryLinks
        ellipsis
        size={paginationSize}
      />
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;
