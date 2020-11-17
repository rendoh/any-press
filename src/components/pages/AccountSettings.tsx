import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { Alert, Button, Input } from 'rsuite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { updateUser, UpdateUserValues } from '../../api/user';
import { ValidationMessages } from '../../resources/messages';
import Field from '../form/Field';
import { useUserAccount } from '../../hooks/api/useUserAccount';
import ImageUploader from '../form/ImageUploader';
import OverlayLoader from '../core/OverlayLoader';
import SEO from '../core/SEO';
import PageTitle from '../core/PageTitle';
import { useSetAuthenticatedUser } from '../../hooks/recoil/auth';
import { handleApiError } from '../../utils/handleApiError';
import { ApiError } from '../../api/ApiError';

const AccountSettings: FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    errors,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<UpdateUserValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const setAuthenticatedUser = useSetAuthenticatedUser();
  const onSubmit: SubmitHandler<UpdateUserValues> = async (values) => {
    try {
      const { data } = await updateUser(values);
      setAuthenticatedUser(data);
      reset(userAccount);
      Alert.success('アカウント情報を更新しました');
    } catch (error: unknown) {
      handleApiError(error);
      if (error instanceof ApiError) {
        error
          .getFieldErrorEntries(['name', 'email', 'avatar'])
          .forEach(([key, message]) => {
            setError(key, {
              message,
            });
          });
      }
    }
  };

  const { userAccount, isLoading } = useUserAccount();
  useEffect(() => {
    reset(userAccount);
  }, [userAccount, reset]);

  useEffect(() => {
    register({ name: 'avatar' });
  }, [register]);

  const avatar = watch('avatar');

  return (
    <Wrapper>
      <SEO title="アカウント編集" />
      <PageTitle>アカウント編集</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="アバター" htmlFor="avatar">
          <AvatarUploader
            name="avatar"
            image={avatar}
            icon="user"
            onSuccess={(filePath) => {
              setValue('avatar', filePath);
            }}
            onRemove={() => setValue('avatar', '')}
          />
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
          disabled={isSubmitting || isLoading}
          loading={isSubmitting}
          ripple={false}
        >
          更新
        </Button>
      </form>
      {isLoading && <OverlayLoader />}
    </Wrapper>
  );
};

export default AccountSettings;

const validationSchema = Yup.object().shape<UpdateUserValues>({
  name: Yup.string().required(ValidationMessages.required),
  email: Yup.string()
    .email(ValidationMessages.email)
    .required(ValidationMessages.required),
});

const Wrapper = styled.div`
  max-width: 780px;
  margin: auto;
`;

const uploaderSize = 200;

const AvatarUploader = styled(ImageUploader)`
  width: ${uploaderSize}px;
  height: ${uploaderSize}px;
`;
