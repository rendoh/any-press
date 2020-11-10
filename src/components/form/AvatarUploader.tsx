import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Icon, Loader } from 'rsuite';
import { useUpload } from '../../hooks/api/useUpload';

type AvatarUploaderProps = {
  image?: string;
  onSuccess: (filePath: string) => void;
  onError?: () => void;
  className?: string;
};

const AvatarUploader: FC<AvatarUploaderProps> = ({
  image,
  onSuccess,
  className,
}) => {
  const { upload, isUploading } = useUpload({
    onSuccess(filePath) {
      onSuccess(filePath);
    },
  });
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
