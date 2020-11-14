import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Button, Input } from 'rsuite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ValidationMessages } from '../../resources/messages';
import { LoginValues } from '../../api/auth';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { Paths } from '../../constants/paths';
import Field from '../form/Field';
import MinimalForm from '../form/MinimalForm';
import { useLogin } from '../../hooks/api/useLogin';
import OverlayLoader from '../core/OverlayLoader';

const Login: FC = () => {
  const {
    register,
    errors,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { redirect } = useRedirectToStatePath();
  const { login } = useLogin({
    onSuccess() {
      redirect();
    },
    onError(errors) {
      errors.forEach(([key, message]) => {
        setError(key, {
          message,
        });
      });
    },
  });

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    return login(values);
  };

  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={Paths.home} replace />;
  }

  return (
    <>
      <MinimalForm header="ログイン" onSubmit={handleSubmit(onSubmit)}>
        <Field
          label="メールアドレス"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input id="email" name="email" type="email" inputRef={register} />
        </Field>
        <Field
          label="パスワード"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            id="password"
            name="password"
            type="password"
            inputRef={register}
          />
        </Field>
        <Button
          appearance="primary"
          type="submit"
          disabled={isSubmitting}
          block
          ripple={false}
        >
          ログイン
        </Button>
        <FormFooter>
          <Link to={Paths.register}>新規ユーザ登録</Link>
        </FormFooter>
      </MinimalForm>
      {isSubmitting && <OverlayLoader />}
    </>
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

const FormFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;
