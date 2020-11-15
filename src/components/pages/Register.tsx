import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Button, Input } from 'rsuite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RegisterUserValues } from '../../api/user';
import { Paths } from '../../constants/paths';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { ValidationMessages } from '../../resources/messages';
import MinimalForm from '../form/MinimalForm';
import Field from '../form/Field';
import { useRegister } from '../../hooks/api/useRegister';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';

const Register: FC = () => {
  const {
    handleSubmit,
    errors,
    register,
    setError,
    formState: { isSubmitting },
  } = useForm<RegisterUserValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { register: registerUser } = useRegister({
    onError(errors) {
      errors.forEach(([key, message]) => {
        setError(key, {
          message,
        });
      });
    },
  });
  const onSubmit: SubmitHandler<RegisterUserValues> = async (values) => {
    return registerUser(values);
  };

  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <Navigate to={Paths.home} replace />;
  }

  return (
    <>
      <SEO title="ユーザ登録" />
      <MinimalForm header="ユーザ登録" onSubmit={handleSubmit(onSubmit)}>
        <Field label="ユーザ名" htmlFor="name" error={errors.name?.message}>
          <Input id="name" name="name" type="text" inputRef={register} />
        </Field>
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
        <Field
          label="パスワード（確認）"
          htmlFor="password_confirmation"
          error={errors.password_confirmation?.message}
        >
          <Input
            id="password_confirmation"
            name="password_confirmation"
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
          ユーザ登録
        </Button>
        <FormFooter>
          <Link to={Paths.login}>ログイン</Link>
        </FormFooter>
      </MinimalForm>
      {isSubmitting && <OverlayLoader />}
    </>
  );
};

export default Register;

const validationSchema = Yup.object().shape<RegisterUserValues>({
  name: Yup.string().required(ValidationMessages.required),
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
  password: Yup.string().required(ValidationMessages.required),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], ValidationMessages.passwordConfirmation)
    .required(ValidationMessages.required),
});

const FormFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;
