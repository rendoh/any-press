import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useCreateArticle } from '../../hooks/api/useCreateArticle';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import ArticleEditor, {
  ArticleEditorErrorEntries,
} from '../article/ArticleEditor';
import SEO from '../core/SEO';

const ArticleCreatePage: FC = () => {
  const navigate = useNavigate();
  const [errorEntries, setErrorEntriess] = useState<
    ArticleEditorErrorEntries
  >();
  const { createArticle } = useCreateArticle({
    onSuccess(article) {
      requestAnimationFrame(() => {
        navigate(Paths.articleDetail(article.id));
      });
    },
    onError(errors) {
      setErrorEntriess(errors);
    },
  });

  return (
    <>
      <SEO title="新規記事作成" />
      <Heading>新規記事作成</Heading>
      <ArticleEditor onSubmit={createArticle} errorEntries={errorEntries} />
    </>
  );
};

export default ArticleCreatePage;

const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 25px;
`;
