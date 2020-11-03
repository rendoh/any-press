import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ApiError } from '../../api/ApiError';
import { registerUser, UserRegistrationValues } from '../../api/user';
import { Paths } from '../../constants/paths';
import { useIsAuthenticated } from '../../hooks/recoil/auth';
import { ValidationMessages } from '../../resources/messages';
import styled from '@emotion/styled';
import MinimalForm from '../form/MinimalForm';
import Field from '../form/Field';
import { Alert, Button, Input, Loader } from 'rsuite';

const Register: FC = () => {
  const { handleSubmit, register, errors, setError, formState } = useForm<
    UserRegistrationValues
  >({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting, isSubmitSuccessful } = formState;
  const onSubmit: SubmitHandler<UserRegistrationValues> = async (values) => {
    return registerUser(values)
      .then(() => {
        console.log('TODO: メールをお送りしました（実は送ってないことは内緒）');
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          error.getFieldErrorMessages().forEach((message) => {
            Alert.warning(message);
          });
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

  if (isSubmitSuccessful) {
    <Completed>
      TODO: メールをお送りしました（実は送ってないことは内緒）
    </Completed>;
  }

  return (
    <>
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
      {isSubmitting && <Loader backdrop />}
    </>
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

const Completed = styled.div``;

const FormFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;
