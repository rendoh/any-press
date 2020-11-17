import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTag } from '../../hooks/api/useTag';
import { useTagArticles } from '../../hooks/api/useTagArticles';
import ArticleList from '../article/ArticleList';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import PageTitle from '../core/PageTitle';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';

const TagArticlesPage: FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { tag, isLoading: isTagLoading } = useTag(slug);
  const {
    articles,
    isLoading: isArticleLoading,
    total,
    perPage,
  } = useTagArticles(slug, {
    page,
  });

  const pageCount = Math.ceil(total / perPage);
  const goto = (number: number) => {
    setSearchParams({
      page: number.toString(),
    });
  };

  if (isTagLoading) {
    return <OverlayLoader />;
  }
  if (!tag) {
    return (
      <>
        <SEO title="タグが見つかりませんでした" />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <SEO title={tag.name} />
      <PageTitle>{tag.name}</PageTitle>
      {isArticleLoading ? (
        <OverlayLoader />
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination pages={pageCount} activePage={page} onSelect={goto} />
        </>
      )}
    </>
  );
};

export default TagArticlesPage;
