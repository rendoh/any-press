import React, { FC } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Colors } from '../../constants/styles';
import { ValidationMessages } from '../../resources/messages';
import { login, LoginValues } from '../../api/auth';
import {
  useIsAuthenticated,
  useSetAuthenticatedUser,
} from '../../hooks/recoil/auth';
import { Paths } from '../../constants/paths';
import { ApiError } from '../../api/ApiError';

const Login: FC = () => {
  const { register, handleSubmit, formState, errors, setError } = useForm<
    LoginValues
  >({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting, isValid } = formState;
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Input
          name="email"
          type="email"
          ref={register}
          invalid={!!errors.email}
        />
        {errors.email && <Feedback>{errors.email.message}</Feedback>}
      </FormRow>
      <FormRow>
        <Input
          name="password"
          type="password"
          ref={register}
          invalid={!!errors.password}
        />
        {errors.password && <Feedback>{errors.password.message}</Feedback>}
      </FormRow>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        ログイン
      </Button>
    </Form>
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

type InputProps = { invalid?: boolean };
const Input = styled.input<InputProps>`
  width: 100%;
  background: ${({ invalid }) => (invalid ? `${Colors.error}22` : '#fff')};
  padding: 10px;
`;

const Feedback = styled.p`
  color: ${Colors.error};
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
