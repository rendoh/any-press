import styled from '@emotion/styled';
import React, { FC } from 'react';

const NotFound: FC = () => {
  return (
    <Wrapper>
      <Heading>404</Heading>
      <Message>お探しのページが見つかりませんでした</Message>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  padding: 100px 20px;
  text-align: center;
`;

const Heading = styled.h1``;

const Message = styled.p``;
