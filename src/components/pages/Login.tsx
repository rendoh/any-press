import React, { FC } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Colors } from '../../constants/styles';
import { ValidationMessages } from '../../resources/messages';
import { login, LoginErrors, LoginValues } from '../../api/auth';
import { useSetAuthenticatedUser } from '../../hooks/recoil/auth';
import { Paths } from '../Routes';
import { ApiError } from '../../api/ApiError';

const Login: FC = () => {
  const { register, handleSubmit, formState, errors, setError } = useForm<
    LoginValues
  >({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });
  const { isSubmitting, isValid } = formState;
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    return login(values)
      .then(({ data }) => {
        setAuthenticatedUser(data);
        navigate(Paths.home);
      })
      .catch((e) => {
        if (e instanceof ApiError) {
          const { message, errors }: ApiError<LoginErrors> = e;
          toast.error(message);
          Object.entries(errors).forEach(([key, messages]) => {
            if (messages && messages.length > 0) {
              setError(key as keyof LoginErrors, {
                message: messages[0],
              });
            }
          });
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Input name="email" type="email" ref={register} />
        {errors.email && <Feedback>{errors.email.message}</Feedback>}
      </FormRow>
      <FormRow>
        <Input name="password" type="password" ref={register} />
        {errors.password && <Feedback>{errors.password.message}</Feedback>}
      </FormRow>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        ログイン
      </Button>
    </Form>
  );
};

export default Login;

const loginSchema = Yup.object().shape<LoginValues>({
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
