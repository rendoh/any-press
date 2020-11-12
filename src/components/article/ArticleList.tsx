import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Article } from '../../types/article';
import ArticleCard from './ArticleCard';

type ArticleListProps = {
  articles: Article[];
};

const ArticleList: FC<ArticleListProps> = ({ articles }) => (
  <Wrapper>
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
