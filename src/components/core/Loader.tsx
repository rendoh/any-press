import React, { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';
import { Colors } from '../../constants/styles';

type LoaderProps = {
  inline?: boolean;
};

const Loader: FC<LoaderProps> = ({ inline }) => (
  <Wrapper inline={inline}>
    <MoonLoader color={Colors.primary} size={40} />
  </Wrapper>
);

export default Loader;

const overlayStyle = css`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

type WrapperProps = Pick<LoaderProps, 'inline'>;
const Wrapper = styled.div<WrapperProps>`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  ${({ inline }) => !inline && overlayStyle};
`;
