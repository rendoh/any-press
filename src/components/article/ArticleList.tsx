import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Article } from '../../types/article';
import ArticleCard from './ArticleCard';

type ArticleListProps = {
  articles: Article[];
  emptyText?: string | false;
  'data-testid'?: string;
};

const ArticleList: FC<ArticleListProps> = ({
  articles,
  emptyText = '記事が見つかりませんでした',
  'data-testid': dataTestId,
}) =>
  articles.length === 0 ? (
    emptyText ? (
      <EmptyText data-testid={dataTestId}>{emptyText}</EmptyText>
    ) : null
  ) : (
    <Wrapper data-testid={dataTestId}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </Wrapper>
  );

export default ArticleList;

const Wrapper = styled.div`
  max-width: 980px;
  margin: auto;
  > :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const EmptyText = styled.p`
  text-align: center;
  padding: 80px 20px;
`;
