import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, Tag } from 'rsuite';
import { useArticleDetail } from '../../hooks/api/useArticleDetail';
import { formatISOString } from '../../utils/formatters';
import Avatar from '../core/Avatar';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import { Paths } from '../../constants/paths';
import { useAuthenticatedUser } from '../../hooks/recoil/auth';
import SEO from '../core/SEO';
import ArticleHtmlContent from '../article/ArticleHtmlContent';
import { css } from '@emotion/core';
import { useDeleteArticle } from '../../hooks/api/useDeleteArticle';

const ArticleDetailPage: FC = () => {
  const { id } = useParams();
  const { articleDetail: article, isLoading } = useArticleDetail(Number(id));
  const authenticateduser = useAuthenticatedUser();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const openDeleteModal = useCallback(() => {
    setIsDeleteModalActive(true);
  }, []);
  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalActive(false);
  }, []);

  const navigate = useNavigate();
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

  return (
    <>
      <SEO title={article.title} />
      <Header>
        <TitleRow>
          <Title>{article.title}</Title>
          {authenticateduser?.id === article.user.id && (
            <ButtonGroup>
              <Button componentClass={Link} to={Paths.articleEdit(article.id)}>
                編集
              </Button>
              <Button onClick={openDeleteModal}>削除</Button>
              <DeleteModal
                show={isDeleteModalActive}
                onHide={closeDeleteModal}
                size="xs"
                overflow
              >
                <Modal.Header>
                  <Modal.Title>記事を削除しますか？</Modal.Title>
                </Modal.Header>
                <ModalFooter
                  css={css`
                    margin-top: 10px;
                  `}
                >
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
            </ButtonGroup>
          )}
        </TitleRow>
        <HeaderInfo>
          <UserLink to={Paths.userDetail(article.user.id)}>
            <Avatar avatar={article.user.avatar} />
            <UserInfoName>{article.user.name}</UserInfoName>
          </UserLink>
          <Separator>/</Separator>
          <DateText>{formatISOString(article.created_at)}</DateText>
        </HeaderInfo>
        <Categories>
          <CategoryTag>{article.category.name}</CategoryTag>
          {article.tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </Categories>
      </Header>
      {article.image && <MainVisual src={article.image} alt="" />}
      <ArticleHtmlContent dangerHtml={article.content} />
      {isSubmitting && <OverlayLoader backdrop />}
    </>
  );
};

export default ArticleDetailPage;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.5;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 20px;
  > * {
    margin-left: 10px;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const UserInfoName = styled.span`
  display: inline-block;
  margin-left: 10px;
`;

const Separator = styled.span`
  display: block;
  margin: 0 10px;
`;

const DateText = styled.p``;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  > * {
    margin: 0 10px 10px 0 !important;
  }
`;

const CategoryTag = styled(Tag)`
  background: #666;
  color: #fff;
`;

const MainVisual = styled.img`
  display: block;
  margin: 0 auto 30px;
  max-width: 100%;
`;

const DeleteModal = styled(Modal)`
  @media (max-width: 420px) {
    width: 90%;
  }
`;

const ModalFooter = styled(Modal.Footer)`
  margin-top: 10px;
`;
