import styled from '@emotion/styled';
import React, { FC, useMemo } from 'react';
import { Icon, SelectPicker } from 'rsuite';
import { FormControlPickerProps } from 'rsuite/lib/@types/common';
import { useCategories } from '../../hooks/queries/useCategories';
import { convertToOptions, Option } from '../../utils/options';

type CategorySelectorProps = Pick<
  FormControlPickerProps<number>,
  'onChange'
> & {
  id?: string;
  value?: number;
};
const CategorySelector: FC<CategorySelectorProps> = ({
  id,
  onChange,
  value,
}) => {
  const { categories, isLoading, refetch } = useCategories();
  const categoryOptions: Option[] = useMemo(() => {
    return convertToOptions(categories);
  }, [categories]);
  return (
    <SelectPicker
      id={id}
      data={categoryOptions}
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

export default CategorySelector;

const Spinner = styled.div`
  padding: 0 0 10px;
  text-align: center;
`;
