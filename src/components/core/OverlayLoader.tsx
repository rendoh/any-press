import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Loader } from 'rsuite';

type OverlayLoaderProps = {
  backdrop?: boolean;
};

const OverlayLoader: FC<OverlayLoaderProps> = ({ backdrop }) => (
  <Icon backdrop={backdrop} center={!backdrop} />
);

export default OverlayLoader;

const Icon = styled(Loader)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;
