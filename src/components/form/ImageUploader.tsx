import styled from '@emotion/styled';
import React, { FC, useState } from 'react';
import { Icon, IconButton } from 'rsuite';
import { IconNames } from 'rsuite/lib/Icon';
import { uploadImage } from '../../api/upload';
import { handleApiError } from '../../utils/handleApiError';
import OverlayLoader from '../core/OverlayLoader';

type ImageUploaderProps = {
  image?: string;
  onSuccess: (filePath: string) => void;
  onError?: () => void;
  className?: string;
  icon?: IconNames;
  name?: string;
  onRemove?: () => void;
};

const ImageUploader: FC<ImageUploaderProps> = ({
  image,
  onSuccess,
  onError,
  onRemove,
  className,
  name,
  icon = 'image',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const { data } = await uploadImage(file);
      onSuccess(data.file_path);
    } catch (error: unknown) {
      handleApiError(error);
      if (onError) onError();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Wrapper className={className}>
      {isUploading && <OverlayLoader backdrop />}
      <FileField
        name={name}
        type="file"
        onChange={(e) => {
          if (e.target.files?.length) {
            handleUpload(e.target.files[0]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            e.target.value = null as any;
          }
        }}
      />
      {image ? <Preview src={image} alt="" /> : <Icon icon={icon} size="5x" />}
      {image && (
        <RemoveButton
          circle
          icon={<Icon icon="close" />}
          size="xs"
          onClick={onRemove}
        />
      )}
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
  border: 2px dashed #e5e5ea;
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

const RemoveButton = styled(IconButton)`
  position: absolute !important;
  top: 12px;
  right: 12px;
`;
