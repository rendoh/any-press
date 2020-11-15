import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleValues } from '../../api/article';
import { Paths } from '../../constants/paths';
import { useArticleDetail } from '../../hooks/api/useArticleDetail';
import { useUpdateArticle } from '../../hooks/api/useUpdateArticle';
import { useAuthenticatedUser } from '../../hooks/recoil/auth';
import { ArticleDetail } from '../../types/article';
import ArticleEditor, {
  ArticleEditorErrorEntries,
} from '../article/ArticleEditor';
import Forbidden from '../core/Forbidden';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';

const ArticleEditPage: FC = () => {
  const { id } = useParams();
  const { articleDetail: article, isLoading } = useArticleDetail(Number(id));
  const authenticateduser = useAuthenticatedUser();

  const navigate = useNavigate();
  const [errorEntries, setErrorEntriess] = useState<
    ArticleEditorErrorEntries
  >();
  const { updateArticle } = useUpdateArticle({
    onSuccess(article) {
      requestAnimationFrame(() => {
        navigate(Paths.home);
      });
    },
    onError(errors) {
      setErrorEntriess(errors);
    },
  });

  if (isLoading) {
    return <OverlayLoader backdrop={false} />;
  }
  if (!article) {
    return (
      <>
        <SEO title="記事が見つかりませんでした" />
        <NotFound />
      </>
    );
  }
  if (authenticateduser?.id !== article.user.id) {
    return (
      <>
        <SEO title="権限がありません" />
        <Forbidden />
      </>
    );
  }

  return (
    <>
      <SEO title={`「${article.title}」編集`} />
      <Heading>記事編集</Heading>
      <ArticleEditor
        defaultValues={convertArticleToFormValues(article)}
        errorEntries={errorEntries}
        onSubmit={(values) => {
          return updateArticle(article.id, values);
        }}
      />
    </>
  );
};

export default ArticleEditPage;

const convertArticleToFormValues = ({
  title,
  image,
  content,
  category,
  tags,
}: ArticleDetail): ArticleValues => ({
  title,
  image,
  content,
  category_id: category.id,
  tags: tags.map(({ id }) => id),
});

const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 25px;
`;
