import { convertToOptions } from './options';

test('オプションの形式に変換できる', () => {
  const values = [
    {
      id: 1,
      name: 'lorem',
    },
    {
      id: 2,
      name: 'ipsum',
    },
    {
      id: 3,
      name: 'dolor',
    },
    {
      id: 4,
      name: 'sit',
    },
    {
      id: 5,
      name: 'amet',
    },
  ];
  const options = convertToOptions(values);
  expect(options).toEqual([
    {
      value: 1,
      label: 'lorem',
    },
    {
      value: 2,
      label: 'ipsum',
    },
    {
      value: 3,
      label: 'dolor',
    },
    {
      value: 4,
      label: 'sit',
    },
    {
      value: 5,
      label: 'amet',
    },
  ]);
});
