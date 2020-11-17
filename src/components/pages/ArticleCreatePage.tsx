import React, { FC, useState } from 'react';
import { useCreateArticle } from '../../hooks/api/useCreateArticle';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import ArticleEditor, {
  ArticleEditorErrorEntries,
} from '../article/ArticleEditor';
import SEO from '../core/SEO';
import PageTitle from '../core/PageTitle';

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
      <PageTitle>新規記事作成</PageTitle>
      <ArticleEditor onSubmit={createArticle} errorEntries={errorEntries} />
    </>
  );
};

export default ArticleCreatePage;
