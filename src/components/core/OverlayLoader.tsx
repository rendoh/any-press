import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Loader } from 'rsuite';

type OverlayLoaderProps = {
  backdrop?: boolean;
  'data-testid'?: string;
};

const OverlayLoader: FC<OverlayLoaderProps> = ({
  backdrop,
  'data-testid': dataTestId = 'loader',
}) => <Icon backdrop={backdrop} center={!backdrop} data-testid={dataTestId} />;

export default OverlayLoader;

const Icon = styled(Loader)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;
