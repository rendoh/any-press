import { formatISOString } from './formatters';

test('日付をフォーマットできる', () => {
  const dates = {
    '2020-01-01T01:00:00.000Z': '2020年1月1日',
    '2020-11-22T01:00:00.000Z': '2020年11月22日',
  };
  Object.entries(dates).forEach(([key, value]) => {
    expect(formatISOString(key)).toBe(value);
  });
});
