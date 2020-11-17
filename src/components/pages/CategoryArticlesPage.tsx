import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCategory } from '../../hooks/api/useCategory';
import { useCategoryArticles } from '../../hooks/api/useCategoryArticles';
import ArticleList from '../article/ArticleList';
import NotFound from '../core/NotFound';
import OverlayLoader from '../core/OverlayLoader';
import PageTitle from '../core/PageTitle';
import Pagination from '../core/Pagination';
import SEO from '../core/SEO';

const CategoryArticlesPage: FC = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { category, isLoading: isCategoryLoading } = useCategory(slug);
  const {
    articles,
    isLoading: isArticleLoading,
    total,
    perPage,
  } = useCategoryArticles(slug, {
    page,
  });

  const pageCount = Math.ceil(total / perPage);
  const goto = (number: number) => {
    setSearchParams({
      page: number.toString(),
    });
    document.body.scrollIntoView({
      behavior: 'auto',
      block: 'start',
    });
  };

  if (isCategoryLoading) {
    return <OverlayLoader />;
  }
  if (!category) {
    return (
      <>
        <SEO title="カテゴリが見つかりませんでした" />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <SEO title={category.name} />
      <PageTitle>{category.name}</PageTitle>
      <ArticleList articles={articles} />
      {isArticleLoading ? (
        <OverlayLoader />
      ) : (
        <Pagination pages={pageCount} activePage={page} onSelect={goto} />
      )}
    </>
  );
};

export default CategoryArticlesPage;
