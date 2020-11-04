import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ApiError } from '../../api/ApiError';
import { updateUser, UserUpdateValues, fetchUserAccount } from '../../api/user';
import { useSetAuthenticatedUser } from '../../hooks/recoil/auth';
import { ErrorMessages, ValidationMessages } from '../../resources/messages';
import { Alert, Button, Icon, IconButton, Input, Loader } from 'rsuite';
import Field from '../form/Field';
import styled from '@emotion/styled';
import AvatarUploader from '../form/AvatarUploader';

const AccountSettings: FC = () => {
  const setAuthenticatedUser = useSetAuthenticatedUser();
  const {
    register,
    handleSubmit,
    formState,
    errors,
    reset,
    setError,
    watch,
    setValue,
  } = useForm<UserUpdateValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

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

  useEffect(() => {
    register({ name: 'avatar' });
  }, [register]);

  const avatar = watch('avatar');

  return (
    <Wrapper>
      <Heading>アカウント編集</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="アバター">
          <UploaderWrapper>
            <Uploader
              image={avatar}
              onSuccess={(filePath) => {
                setValue('avatar', filePath);
              }}
            />
            {avatar && (
              <RemoveButton
                circle
                icon={<Icon icon="close" />}
                size="sm"
                onClick={() => setValue('avatar', '')}
              />
            )}
          </UploaderWrapper>
        </Field>
        <Field label="ユーザ名" htmlFor="name" error={errors.name?.message}>
          <Input id="name" name="name" inputRef={register} type="text" />
        </Field>
        <Field
          label="メールアドレス"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input id="email" name="email" inputRef={register} type="email" />
        </Field>
        <Button
          type="submit"
          appearance="primary"
          disabled={isSubmitting}
          ripple={false}
        >
          更新
        </Button>
      </form>
      {isLoading && <Loader backdrop />}
    </Wrapper>
  );
};

export default AccountSettings;

const validationSchema = Yup.object().shape<UserUpdateValues>({
  name: Yup.string().required(ValidationMessages.required),
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
});

const Wrapper = styled.div`
  padding: 20px;
  max-width: 780px;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 25px;
`;

const uploaderSize = 200;

const UploaderWrapper = styled.div`
  width: ${uploaderSize}px;
  position: relative;
`;

const Uploader = styled(AvatarUploader)`
  width: ${uploaderSize}px;
  height: ${uploaderSize}px;
`;

const RemoveButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
`;
