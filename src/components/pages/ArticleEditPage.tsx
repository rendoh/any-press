import React, { FC, useCallback, useState } from 'react';
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
import PageTitle from '../core/PageTitle';
import { Button, Modal } from 'rsuite';
import styled from '@emotion/styled';
import { useDeleteArticle } from '../../hooks/api/useDeleteArticle';

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
      navigate(Paths.articleDetail(article.id));
    },
    onError(errors) {
      setErrorEntriess(errors);
    },
  });

  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const openDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalActive(false);
  }, []);

  const { deleteArticle, isSubmitting } = useDeleteArticle({
    onSuccess() {
      navigate(Paths.home);
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
      <Header>
        <PageTitle>記事編集</PageTitle>
        <DeleteButton onClick={openDeleteModal}>記事を削除</DeleteButton>
      </Header>
      <ArticleEditor
        defaultValues={convertArticleToFormValues(article)}
        errorEntries={errorEntries}
        onSubmit={(values) => {
          return updateArticle(article.id, values);
        }}
      />
      <DeleteModal
        show={isDeleteModalActive}
        onHide={closeDeleteModal}
        size="xs"
        overflow
      >
        <Modal.Header>
          <Modal.Title>記事を削除しますか？</Modal.Title>
        </Modal.Header>
        <ModalFooter>
          <Button
            onClick={() => deleteArticle(article.id)}
            appearance="primary"
          >
            削除
          </Button>
          <Button onClick={closeDeleteModal} appearance="subtle">
            キャンセル
          </Button>
        </ModalFooter>
      </DeleteModal>
      {isSubmitting && <OverlayLoader backdrop />}
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
  public: isPublic,
}: ArticleDetail): ArticleValues => ({
  title,
  image,
  content,
  category_id: category.id,
  tags: tags.map(({ id }) => id),
  public: isPublic,
});

const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const DeleteButton = styled(Button)`
  margin-left: 20px;
`;

const DeleteModal = styled(Modal)`
  @media (max-width: 420px) {
    width: 90%;
  }
`;

const ModalFooter = styled(Modal.Footer)`
  margin-top: 10px;
`;
