import React, { FC } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button, Icon, Panel, Tag, Tooltip, Whisper } from 'rsuite';
import { Article } from '../../types/article';
import Avatar from '../core/Avatar';
import { formatISOString } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { useAuthenticatedUser } from '../../hooks/recoil/auth';

type ArticleCardProps = {
  article: Article;
  className?: string;
};

const ArticleCard: FC<ArticleCardProps> = ({
  className,
  article: {
    id,
    title,
    excerpt,
    image,
    created_at,
    category,
    tags,
    user,
    public: isPublic,
  },
}) => {
  const authenticatedUser = useAuthenticatedUser();
  const isOwnArticle = authenticatedUser?.id === user.id;

  return (
    <Wrapper
      header={<Link to={Paths.articleDetail(id)}>{title}</Link>}
      bordered
      className={className}
    >
      <ImageLink to={Paths.articleDetail(id)}>
        {image ? (
          <Image src={image} alt="" />
        ) : (
          <PlaceholderImage>
            <ImageIcon icon="image" />
          </PlaceholderImage>
        )}
      </ImageLink>
      <Info>
        {!isPublic && <Private>非公開</Private>}
        <CreatedAt>{formatISOString(created_at)}</CreatedAt>
      </Info>
      <Paragraph>{excerpt}</Paragraph>
      <Categories>
        <CategoryTag componentClass={Link} to={Paths.category(category.slug)}>
          {category.name}
        </CategoryTag>
        {tags.map((tag) => (
          <Tag componentClass={Link} to={Paths.tag(tag.slug)} key={tag.id}>
            {tag.name}
          </Tag>
        ))}
      </Categories>
      <Whisper
        trigger="hover"
        placement="right"
        speaker={<Tooltip>{user.name}</Tooltip>}
      >
        <AvatarTrigger>
          <Link to={Paths.userDetail(user.id)}>
            <Avatar avatar={user.avatar} />
          </Link>
        </AvatarTrigger>
      </Whisper>
      {isOwnArticle && (
        <EditButton componentClass={Link} to={Paths.articleEdit(id)}>
          編集
        </EditButton>
      )}
    </Wrapper>
  );
};

export default ArticleCard;

const verticalImageHeight = 200;

const Wrapper = styled(Panel)`
  position: relative;
  padding-left: 30%;
  @media screen and (max-width: 600px) {
    padding: ${verticalImageHeight}px 0 0;
  }
`;

const imageStyle = css`
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.25s ease-out;
`;

const Image = styled.img`
  ${imageStyle};
  object-fit: cover;
  display: block;
`;

const PlaceholderImage = styled.div`
  ${imageStyle};
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageLink = styled(Link)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: ${verticalImageHeight}px;
  }
  &:hover ${Image}, &:hover ${PlaceholderImage} {
    transform: scale(1.05);
  }
  &:hover ${PlaceholderImage} {
    background: #c0c0c0;
  }
`;

const ImageIcon = styled(Icon)`
  font-size: 20px;
  color: #666;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-top: -15px;
  margin-bottom: 10px;
`;

const Private = styled(Tag)`
  margin-right: 10px;
  background: #333;
  color: #fff;
`;

const CreatedAt = styled.p`
  color: #666;
  font-size: 80%;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  > * {
    margin: 0 10px 10px 0 !important;
  }
`;

const Paragraph = styled.p``;

const CategoryTag = styled(Tag)`
  background: #666;
  color: #fff;
`;

const AvatarTrigger = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  appearance: none;
  background: none;
  border: none;
  padding: 0;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
