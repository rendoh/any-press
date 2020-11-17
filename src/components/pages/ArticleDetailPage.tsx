import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { Button, Tag } from 'rsuite';
import { useArticleDetail } from '../../hooks/api/useArticleDetail';
import { formatISOString } from '../../utils/formatters';
import Avatar from '../core/Avatar';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import { Paths } from '../../constants/paths';
import { useAuthenticatedUser } from '../../hooks/recoil/auth';
import SEO from '../core/SEO';
import ArticleHtmlContent from '../article/ArticleHtmlContent';
import PageTitle from '../core/PageTitle';

const ArticleDetailPage: FC = () => {
  const { id } = useParams();
  const { articleDetail: article, isLoading } = useArticleDetail(Number(id));
  const authenticateduser = useAuthenticatedUser();

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

  return (
    <>
      <SEO title={article.title} />
      <Header>
        <TitleRow>
          <PageTitle>{article.title}</PageTitle>
          {authenticateduser?.id === article.user.id && (
            <EditButton
              componentClass={Link}
              to={Paths.articleEdit(article.id)}
            >
              編集
            </EditButton>
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
          {!article.public && <PrivateTag>非公開</PrivateTag>}
          <CategoryTag
            componentClass={Link}
            to={Paths.category(article.category.slug)}
          >
            {article.category.name}
          </CategoryTag>
          {article.tags.map((tag) => (
            <Tag componentClass={Link} to={Paths.tag(tag.slug)} key={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </Categories>
      </Header>
      {article.image && <MainVisual src={article.image} alt="" />}
      <ArticleHtmlContent dangerHtml={article.content} />
    </>
  );
};

export default ArticleDetailPage;

const Header = styled.header`
  margin-bottom: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const EditButton = styled(Button)`
  margin-left: 20px;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
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

const PrivateTag = styled(Tag)`
  background: #333;
  color: #fff;
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
