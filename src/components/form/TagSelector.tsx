import styled from '@emotion/styled';
import React, { FC, useMemo } from 'react';
import { CheckPicker, Icon } from 'rsuite';
import { FormControlPickerProps } from 'rsuite/lib/@types/common';
import { useTags } from '../../hooks/api/useTags';
import { convertToOptions, Option } from '../../utils/options';

type TagSelectorProps = Pick<FormControlPickerProps<number[]>, 'onChange'> & {
  id?: string;
  value?: number[];
};
const TagSelector: FC<TagSelectorProps> = ({ id, onChange, value = [] }) => {
  const { tags, isLoading, refetch } = useTags();
  const tagOptions: Option[] = useMemo(() => {
    return convertToOptions(tags);
  }, [tags]);
  return (
    <CheckPicker
      id={id}
      data={tagOptions}
      placeholder="選択してください"
      block
      value={value}
      onChange={onChange}
      onOpen={refetch}
      renderMenu={(menu) => (
        <>
          {isLoading && (
            <Spinner>
              <Icon icon="spinner" spin />
            </Spinner>
          )}
          {menu}
        </>
      )}
    />
  );
};

export default TagSelector;

const Spinner = styled.div`
  padding: 0 0 10px;
  text-align: center;
`;
