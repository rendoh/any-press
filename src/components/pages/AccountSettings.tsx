import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ApiError } from '../../api/ApiError';
import { updateUser, UserUpdateValues, fetchUserAccount } from '../../api/user';
import { useSetAuthenticatedUser } from '../../hooks/recoil/auth';
import { ErrorMessages, ValidationMessages } from '../../resources/messages';
import { Alert, Button, Loader } from 'rsuite';

const AccountSettings: FC = () => {
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    setError,
  } = useForm<UserUpdateValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting, isValid } = formState;

  const onSubmit: SubmitHandler<UserUpdateValues> = async (values) => {
    return updateUser(values)
      .then(({ data }) => {
        setAuthenticatedUser(data);
        reset(data);
        Alert.success('アカウント情報を更新しました');
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          error.getFieldErrorMessages().forEach((message) => {
            Alert.warning(message);
          });
          error
            .getFieldErrorEntries(['name', 'email'])
            .forEach(([key, message]) => {
              setError(key, {
                message,
              });
            });
        }
      });
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchUserAccount()
      .then(({ data }) => {
        // 初期状態をセット
        reset(data);
      })
      .catch(() => {
        Alert.warning(ErrorMessages.connection);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" name="name" ref={register} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input type="email" name="email" ref={register} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting || !isValid}>
          更新
        </Button>
        <Button type="button" appearance="primary">
          更新
        </Button>
      </form>
      {isLoading && <Loader backdrop />}
    </>
  );
};

export default AccountSettings;

const validationSchema = Yup.object().shape<UserUpdateValues>({
  name: Yup.string().required(ValidationMessages.required),
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
});
