import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Avatar from './Avatar';

test('画像が指定されていないときはアイコンが表示される', () => {
  render(<Avatar />);
  expect(screen.queryByTestId('avatar-user-icon')).toBeTruthy();
});

test('画像が指定されているときはアイコンが表示されない', () => {
  render(<Avatar avatar="/example.png" />);
  expect(screen.queryByTestId('avatar-user-icon')).toBeNull();
});
