import React, { FC } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Icon, Panel, Tag, Tooltip, Whisper } from 'rsuite';
import { Article } from '../../types/article';
import Avatar from '../core/Avatar';
import { formatISOString } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Paths } from '../../constants/paths';

type ArticleCardProps = {
  article: Article;
  className?: string;
};

const ArticleCard: FC<ArticleCardProps> = ({
  className,
  article: { id, title, excerpt, image, created_at, category, tags, user },
}) => (
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
    <CreatedAt>{formatISOString(created_at)}</CreatedAt>
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
  </Wrapper>
);

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
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  position: absolute;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: ${verticalImageHeight}px;
  }
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

const ImageIcon = styled(Icon)`
  font-size: 20px;
  color: #666;
`;

const CreatedAt = styled.p`
  color: #666;
  margin-top: -15px;
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

const ImageLink = styled(Link)`
  display: block;
`;
