import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { Alert, Button, Icon, IconButton, Input, Loader } from 'rsuite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UpdateUserValues } from '../../api/user';
import { ValidationMessages } from '../../resources/messages';
import Field from '../form/Field';
import { useUserAccount } from '../../hooks/api/useUserAccount';
import { useUpdateUser } from '../../hooks/api/useUpdateUser';
import ImageUploader from '../form/ImageUploader';

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

  const { updateUser } = useUpdateUser({
    onSuccess(userAccount) {
      reset(userAccount);
      Alert.success('アカウント情報を更新しました');
    },
    onError(errors) {
      errors.forEach(([key, message]) => {
        setError(key, {
          message,
        });
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateUserValues> = async (values) => {
    return updateUser(values);
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
      <Heading>アカウント編集</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="アバター" htmlFor="avatar">
          <UploaderWrapper>
            <AvatarUploader
              name="avatar"
              image={avatar}
              onSuccess={(filePath) => {
                setValue('avatar', filePath);
              }}
              icon="user"
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
          disabled={isSubmitting || isLoading}
          ripple={false}
        >
          更新
        </Button>
      </form>
      {(isLoading || isSubmitting) && <Loader backdrop />}
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

const AvatarUploader = styled(ImageUploader)`
  width: ${uploaderSize}px;
  height: ${uploaderSize}px;
`;

const RemoveButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
`;
