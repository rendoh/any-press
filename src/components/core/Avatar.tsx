import React, { FC } from 'react';
import { Icon, Avatar as RsuiteAvatar } from 'rsuite';
import { TypeAttributes } from 'rsuite/lib/@types/common';

type AvatarProps = {
  avatar?: string;
  className?: string;
  size?: TypeAttributes.Size;
};

const Avatar: FC<AvatarProps> = ({ avatar, className, size }) =>
  avatar ? (
    <RsuiteAvatar
      className={className}
      circle
      src={avatar}
      alt=""
      size={size}
    />
  ) : (
    <RsuiteAvatar className={className} circle alt="" size={size}>
      <Icon icon="user" />
    </RsuiteAvatar>
  );

export default Avatar;
