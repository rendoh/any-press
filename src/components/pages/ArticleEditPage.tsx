import React, { FC, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { useArticleDetail } from '../../hooks/api/useArticleDetail';
import { useAuthenticatedUser } from '../../hooks/recoil/auth';
import ArticleEditor from '../article/ArticleEditor';
import Forbidden from '../core/Forbidden';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';
import PageTitle from '../core/PageTitle';
import { Alert, Button, Modal } from 'rsuite';
import styled from '@emotion/styled';
import { deleteArticle } from '../../api/article';
import { handleApiError } from '../../utils/handleApiError';

const ArticleEditPage: FC = () => {
  const { id } = useParams();
  const { articleDetail: article, isLoading } = useArticleDetail(Number(id));
  const authenticateduser = useAuthenticatedUser();

  const navigate = useNavigate();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const openDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalActive(false);
  }, []);

  const [isDeleting, setIsDeleting] = useState(false);
  const onDeleteClick = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteArticle(Number(id));
      Alert.success('記事を削除しました');
      navigate(Paths.accountArticles);
    } catch (error: unknown) {
      handleApiError(error);
      setIsDeleting(false);
    }
  };
  if (isLoading) {
    return <OverlayLoader />;
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
      <ArticleEditor articleDetail={article} />
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
            onClick={() => onDeleteClick(article.id)}
            appearance="primary"
            disabled={isDeleting}
            loading={isDeleting}
          >
            削除
          </Button>
          <Button onClick={closeDeleteModal} appearance="subtle">
            キャンセル
          </Button>
        </ModalFooter>
      </DeleteModal>
    </>
  );
};

export default ArticleEditPage;

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
