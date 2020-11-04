import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import { Alert, Icon, Loader } from 'rsuite';
import { ApiError } from '../../api/ApiError';
import { uploadImage } from '../../api/upload';

type AvatarUploaderProps = {
  image?: string;
  onSuccess: (filePath: string) => void;
  onError?: () => void;
  className?: string;
};

const AvatarUploader: FC<AvatarUploaderProps> = ({
  image,
  onSuccess,
  onError,
  className,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const upload = async (file: File) => {
    setIsUploading(true);
    try {
      const { data } = await uploadImage(file);
      onSuccess(data.file_path);
      Alert.success('ファイルを送信しました');
    } catch (error) {
      if (error instanceof ApiError) {
        error.getFieldErrorMessages().forEach((message) => {
          Alert.error(message);
        });
      }
      if (onError) {
        onError();
      }
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Wrapper className={className}>
      {isUploading && <Loader center backdrop />}
      <FileField
        type="file"
        onChange={(e) => {
          if (e.target.files?.length) {
            upload(e.target.files[0]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            e.target.value = null as any;
          }
        }}
      />
      {image ? <Preview src={image} alt="" /> : <Icon icon="user" size="5x" />}
    </Wrapper>
  );
};

export default AvatarUploader;

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 2px dashed #f1f1f1;
  padding: 8px;
`;

const FileField = styled.input`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
`;

const Preview = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
