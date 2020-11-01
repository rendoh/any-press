import React, { FC } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ValidationMessages } from '../../resources/messages';
import { login, LoginValues } from '../../api/auth';
import {
  useIsAuthenticated,
  useSetAuthenticatedUser,
} from '../../hooks/recoil/auth';
import { Paths } from '../../constants/paths';
import { ApiError } from '../../api/ApiError';
import TinyFormInput from '../form/TinyForm/TinyFormInput';
import TinyFormRow from '../form/TinyForm/TinyFormRow';
import TinyForm from '../form/TinyForm/TinyForm';
import Feedback from '../form/Feedback';
import TinyFormRowLabel from '../form/TinyForm/TinyFormRowLabel';
import TinyFormButton from '../form/TinyForm/TinyFormButton';
import TinyFormTitle from '../form/TinyForm/TinyFormTitle';
import TinyFormFooter from '../form/TinyForm/TinyFormFooter';
import Loader from '../core/Loader';

const Login: FC = () => {
  const { register, handleSubmit, formState, errors, setError } = useForm<
    LoginValues
  >({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const { redirect } = useRedirectToStatePath();

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    return login(values)
      .then(({ data }) => {
        setAuthenticatedUser(data);
        redirect();
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
        <TinyFormTitle>ログイン</TinyFormTitle>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="email">メールアドレス</TinyFormRowLabel>
          <TinyFormInput
            id="email"
            name="email"
            type="email"
            ref={register}
            invalid={!!errors.email}
          />
          {errors.email && <Feedback>{errors.email.message}</Feedback>}
        </TinyFormRow>
        <TinyFormRow>
          <TinyFormRowLabel htmlFor="password">パスワード</TinyFormRowLabel>
          <TinyFormInput
            id="password"
            name="password"
            type="password"
            ref={register}
            invalid={!!errors.password}
          />
          {errors.password && <Feedback>{errors.password.message}</Feedback>}
        </TinyFormRow>
        <TinyFormButton type="submit" disabled={isSubmitting}>
          ログイン
        </TinyFormButton>
        <TinyFormFooter>
          <Link to={Paths.register}>新規ユーザ登録</Link>
        </TinyFormFooter>
      </TinyForm>
      {isSubmitting && <Loader backdrop />}
    </Wrapper>
  );
};

export default Login;

type RouterState = {
  from?: string;
} | null;

function useRedirectToStatePath() {
  const state: RouterState = useLocation().state;
  const navigate = useNavigate();

  return {
    redirect() {
      const to = state && state.from ? state.from : Paths.home;
      navigate(to);
    },
  };
}

const validationSchema = Yup.object().shape<LoginValues>({
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
  password: Yup.string().required(ValidationMessages.required),
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  min-height: 80vh;
`;
