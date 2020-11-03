import React, { FC } from 'react';
import styled from '@emotion/styled';
import Feedback from './Feedback';

type FieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
};

const Field: FC<FieldProps> = ({ label, htmlFor, error, children }) => (
  <Wrapper>
    {label && (
      <LabelWrapper>
        <Label htmlFor={htmlFor}>{label}</Label>
      </LabelWrapper>
    )}
    {children}
    {error && <Message>{error}</Message>}
  </Wrapper>
);

export default Field;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const LabelWrapper = styled.p`
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-size: 12px;
`;

const Message = styled(Feedback)`
  margin-top: 10px;
`;
