import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Colors } from '../../constants/styles';
import { LoginFormValues } from '../../types/auth';
import { ValidationMessages } from '../../resources/messages';
import { useLoginUseCase } from '../../hooks/usecases/auth';

const Login: FC = () => {
  const login = useLoginUseCase();
  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    isValid,
  } = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    async onSubmit(value) {
      await login(value);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <Input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        {touched.email && errors.email && <Feedback>{errors.email}</Feedback>}
      </FormRow>
      <FormRow>
        <Input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {touched.password && errors.password && (
          <Feedback>{errors.password}</Feedback>
        )}
      </FormRow>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        ログイン
      </Button>
    </Form>
  );
};

export default Login;

const loginSchema = Yup.object().shape<LoginFormValues>({
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
  password: Yup.string().required(ValidationMessages.required),
});

const Form = styled.form`
  width: 500px;
  max-width: calc(100% - 40px);
  margin: 100px auto;
  background: ${Colors.background};
  border-radius: 5px;
  padding: 20px;
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  background: #fff;
  box-shadow: inset 0 0 0 100px #fff;
  padding: 10px;
`;

const Feedback = styled.p`
  color: #b84646;
  font-size: 12px;
  margin-top: 10px;
`;

const Button = styled.button`
  background: ${Colors.primary};
  width: 100%;
  padding: 10px;
  color: #fff;
  &:hover {
    background: ${Colors.primaryDark};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
