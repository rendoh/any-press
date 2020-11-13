import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Icon, Loader } from 'rsuite';
import { IconNames } from 'rsuite/lib/Icon';
import { useUpload } from '../../hooks/api/useUpload';

type ImageUploaderProps = {
  image?: string;
  onSuccess: (filePath: string) => void;
  onError?: () => void;
  className?: string;
  icon?: IconNames;
  name?: string;
};

const ImageUploader: FC<ImageUploaderProps> = ({
  image,
  onSuccess,
  className,
  name,
  icon = 'image',
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
        name={name}
        type="file"
        onChange={(e) => {
          if (e.target.files?.length) {
            upload(e.target.files[0]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            e.target.value = null as any;
          }
        }}
      />
      {image ? <Preview src={image} alt="" /> : <Icon icon={icon} size="5x" />}
    </Wrapper>
  );
};

export default ImageUploader;

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
  object-fit: contain;
  width: 100%;
  height: 100%;
  background: #ccc;
`;
