import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Loader, Tag } from 'rsuite';
import { useArticleDetail } from '../../hooks/api/useArticleDetail';
import { formatISOString } from '../../utils/formatters';
import Avatar from '../core/Avatar';
import NotFound from '../core/NotFound';
import { css } from '@emotion/core';

const ArticleDetailPage: FC = () => {
  const { id } = useParams();

  const { articleDetail: article, isLoading } = useArticleDetail(Number(id));

  if (isLoading) {
    return <Loader center />;
  }
  if (!article) {
    return <NotFound />;
  }

  return (
    <Root>
      <Header>
        <Title>{article.title}</Title>
        <HeaderInfo>
          <UserInfo>
            <Avatar avatar={article.user.avatar} />
            <UserInfoName>{article.user.name}</UserInfoName>
          </UserInfo>
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
      <Content
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
    </Root>
  );
};

export default ArticleDetailPage;

const Root = styled.div`
  padding-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.5;
`;

const containerStyle = css`
  max-width: 980px;
  padding: 0 20px;
  margin: auto;
`;

const Header = styled.header`
  ${containerStyle}
  padding-top: 30px;
  padding-bottom: 30px;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const UserInfo = styled.div`
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
  margin: 0 auto 50px;
  max-width: 100%;
`;

const Content = styled.div`
  ${containerStyle}
`;
