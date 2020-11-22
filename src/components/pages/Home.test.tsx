import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import '../../testUtils/matchMedia.mock';
import { useArticles } from '../../hooks/queries/useArticles';

const useArticlesMock = useArticles as jest.Mock<
  ReturnType<typeof useArticles>
>;

jest.mock('../../hooks/queries/useArticles.ts');

beforeEach(() => {
  useArticlesMock.mockReturnValue({
    articles: [],
    isLoading: true,
    perPage: 10,
    total: 0,
  });
});

const renderHome = (queryString = '') => {
  render(
    <MemoryRouter initialEntries={[`${Paths.home}${queryString}`]}>
      <Routes>
        <Route path={Paths.home} element={<Home />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('API', () => {
  test('記事一覧を取得する', async () => {
    renderHome();

    expect(useArticlesMock).toBeCalledWith({
      page: 1,
      search: '',
    });
  });

  test('クエリパラメータから、ページと検索文字列が渡される', async () => {
    renderHome('?page=2&search=query');

    expect(useArticlesMock).toBeCalledWith({
      page: 2,
      search: 'query',
    });
  });
});

describe('レンダリング', () => {
  test('ローディング中はスピナーが表示され、記事一覧は表示されない', () => {
    renderHome();

    expect(screen.queryByTestId('loader')).toBeTruthy();
    expect(screen.queryByTestId('home-article-list')).toBeNull();
  });

  test('ローディング中でないときは、記事一覧が表示される', () => {
    useArticlesMock.mockReturnValue({
      articles: [],
      isLoading: false,
      perPage: 10,
      total: 10,
    });
    renderHome();
    expect(screen.queryByTestId('loader')).toBeNull();
    expect(screen.queryByTestId('home-article-list')).toBeTruthy();
  });
});

describe('ヒーローヘッダ', () => {
  test('ヒーローヘッダが表示される', () => {
    renderHome();
    expect(screen.queryByTestId('home-hero')).toBeTruthy();
  });

  test('2ページ目以降はヒーローヘッダが表示されない', () => {
    renderHome('?page=2');
    expect(screen.queryByTestId('home-hero')).toBeNull();
  });

  test('検索クエリが渡ってきているときはヒーローヘッダが表示されない', () => {
    renderHome('?search=query');
    expect(screen.queryByTestId('home-hero')).toBeNull();
  });
});
