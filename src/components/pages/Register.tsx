import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ApiError } from '../../api/ApiError';
import { registerUser, UserRegistrationValues } from '../../api/user';
import { Paths } from '../../constants/paths';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { ValidationMessages } from '../../resources/messages';
import styled from '@emotion/styled';
import TinyForm from '../form/TinyForm/TinyForm';
import TinyFormRow from '../form/TinyForm/TinyFormRow';
import TinyFormRowLabel from '../form/TinyForm/TinyFormRowLabel';
import TinyFormInput from '../form/TinyForm/TinyFormInput';
import TinyFormButton from '../form/TinyForm/TinyFormButton';
import Feedback from '../form/Feedback';
import TinyFormTitle from '../form/TinyForm/TinyFormTitle';
import TinyFormFooter from '../form/TinyForm/TinyFormFooter';
import Loader from '../core/Loader';

const Register: FC = () => {
  const { handleSubmit, register, errors, setError, formState } = useForm<
    UserRegistrationValues
  >({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;
  const onSubmit: SubmitHandler<UserRegistrationValues> = async (values) => {
    return registerUser(values)
      .then(() => {
        console.log('registered');
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          error
            .getFieldErrorMessages()
            .forEach((message) => toast.error(message));
          error
            .getFieldErrorEntries(['email', 'password'])
            .forEach(([key, message]) => {
              setError(key, {
                message,
              });
            });
        }
      });
  };

  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={Paths.home} />;
  }

  return (
    <Wrapper>
      <TinyForm onSubmit={handleSubmit(onSubmit)}>
        <TinyFormTitle>ユーザー登録</TinyFormTitle>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="name">ユーザ名</TinyFormRowLabel>
          <TinyFormInput
            type="text"
            id="name"
            name="name"
            ref={register}
            invalid={!!errors.name}
          />
          {errors.name && <Feedback>{errors.name.message}</Feedback>}
        </TinyFormRow>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="email">メールアドレス</TinyFormRowLabel>
          <TinyFormInput
            type="email"
            id="email"
            name="email"
            ref={register}
            invalid={!!errors.email}
          />
          {errors.email && <Feedback>{errors.email.message}</Feedback>}
        </TinyFormRow>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="password">パスワード</TinyFormRowLabel>
          <TinyFormInput
            type="password"
            id="password"
            name="password"
            ref={register}
            invalid={!!errors.password}
          />
          {errors.password && <Feedback>{errors.password.message}</Feedback>}
        </TinyFormRow>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="password_confirmation">
            パスワード（確認）
          </TinyFormRowLabel>
          <TinyFormInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            ref={register}
            invalid={!!errors.password_confirmation}
          />
          {errors.password_confirmation && (
            <Feedback>{errors.password_confirmation.message}</Feedback>
          )}
        </TinyFormRow>
        <TinyFormButton type="submit" disabled={isSubmitting}>
          ユーザ登録
        </TinyFormButton>
        <TinyFormFooter>
          <Link to={Paths.login}>ログイン</Link>
        </TinyFormFooter>
      </TinyForm>
      {isSubmitting && <Loader backdrop />}
    </Wrapper>
  );
};

export default Register;

const validationSchema = Yup.object().shape<UserRegistrationValues>({
  name: Yup.string().required(ValidationMessages.required),
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
  password: Yup.string().required(ValidationMessages.required),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], ValidationMessages.passwordConfirmation)
    .required(ValidationMessages.required),
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  min-height: 80vh;
`;
