import styled from '@emotion/styled';
import React, { FC, FormEventHandler } from 'react';
import { Panel } from 'rsuite';

type MinimalFormProps = {
  header?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

const MinimalForm: FC<MinimalFormProps> = ({ header, onSubmit, children }) => (
  <Wrapper>
    <FormContainer header={header} shaded>
      <form onSubmit={onSubmit}>{children}</form>
    </FormContainer>
  </Wrapper>
);

export default MinimalForm;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  min-height: 80vh;
`;

const FormContainer = styled(Panel)`
  max-width: 90%;
  width: 500px;
`;
