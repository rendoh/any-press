import styled from '@emotion/styled';
import React, { FC } from 'react';

const Forbidden: FC = () => {
  return (
    <Wrapper>
      <Heading>403</Heading>
      <Message>お探しのページはアクセス権限がありませんでした</Message>
    </Wrapper>
  );
};

export default Forbidden;

const Wrapper = styled.div`
  padding: 100px 20px;
  text-align: center;
`;

const Heading = styled.h1``;

const Message = styled.p``;
