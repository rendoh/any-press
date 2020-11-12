import React, { FC } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Icon, Panel, Tag, Tooltip, Whisper } from 'rsuite';
import { format, parseISO } from 'date-fns';
import { Article } from '../../types/article';
import Avatar from '../core/Avatar';

type ArticleCardProps = {
  article: Article;
  className?: string;
};

const ArticleCard: FC<ArticleCardProps> = ({
  className,
  article: { title, excerpt, image, created_at, category, tags, user },
}) => (
  <Wrapper header={title} bordered className={className}>
    {image ? (
      <Image src={image} alt="" />
    ) : (
      <PlaceholderImage>
        <ImageIcon icon="image" />
      </PlaceholderImage>
    )}
    <CreatedAt>{formatISOString(created_at)}</CreatedAt>
    <Paragraph>{excerpt}</Paragraph>
    <Categories>
      <CategoryTag>{category.name}</CategoryTag>
      {tags.map((tag) => (
        <Tag key={tag.id}>{tag.name}</Tag>
      ))}
    </Categories>
    <Whisper
      trigger="hover"
      placement="right"
      speaker={<Tooltip>{user.name}</Tooltip>}
    >
      <AvatarTrigger>
        <Avatar avatar={user.avatar} />
      </AvatarTrigger>
    </Whisper>
  </Wrapper>
);

export default ArticleCard;

const formatISOString = (isoString: string): string => {
  const date = parseISO(isoString);
  return format(date, 'yyyy年M月d日');
};

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
