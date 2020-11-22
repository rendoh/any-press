import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useArticles } from './useArticles';
import { apiClient } from '../../api/client';
import { handleApiError } from '../../utils/handleApiError';
import { articleFactory } from '../../testUtils/articleFactory';
import { PaginationResponse } from '../../types/api';
import { Article } from '../../types/article';

jest.mock('../../utils/handleApiError');

const mock = new MockAdapter(apiClient);

const articles = [articleFactory()];

beforeEach(() => {
  mock.reset();
  const response: PaginationResponse<Article> = {
    data: articles,
    per_page: 10,
    total: 10,
  };
  mock.onGet('/api/v1/articles').reply(200, response);
});

test('初期状態ではローディング中となる', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useArticles());
  expect(result.current.isLoading).toBe(true);
  await waitForNextUpdate();
});

test('読み込みが終わると、ローディング状態ではなくなる', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useArticles());
  await waitForNextUpdate();
  expect(result.current.isLoading).toBe(false);
});

test('エラーの場合、トースターで通知され、ローディング状態も解除される', async () => {
  mock.reset();
  mock.onGet('/api/v1/articles').replyOnce(404);
  const { result, waitForNextUpdate } = renderHook(() => useArticles());
  await waitForNextUpdate();
  expect(handleApiError).toBeCalled();
  expect(result.current.isLoading).toBe(false);
});

test('レスポンスが保存される', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useArticles());
  await waitForNextUpdate();
  expect(result.current.articles).toEqual(articles);
  expect(result.current.total).toBe(10);
  expect(result.current.perPage).toBe(10);
});

test('ページと検索のクエリ付きで取得できる', async () => {
  const { waitForNextUpdate } = renderHook(() =>
    useArticles({
      page: 2,
      search: 'query',
    }),
  );
  await waitForNextUpdate();
  const { page, search } = mock.history.get[0].params;
  expect(page).toBe(2);
  expect(search).toBe('query');
});

test('ページや検索のクエリが変わると再度取得できる', async () => {
  const {
    result,
    waitForNextUpdate,
    rerender,
  } = renderHook((props: Parameters<typeof useArticles>[0]) =>
    useArticles(props),
  );
  await waitForNextUpdate();
  rerender({ page: 1 });
  expect(result.current.isLoading).toBe(true);
  await waitForNextUpdate();
  rerender({ search: 'query' });
  await waitForNextUpdate();
  expect(mock.history.get).toHaveLength(3);
});
