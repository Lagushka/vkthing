import { FormItem, Select, SelectProps } from '@vkontakte/vkui';
import { FC } from 'react';

type FilterProps = Pick<
  SelectProps,
  'id' | 'placeholder' | 'options' | 'onChange' | 'fetching'
>;

export const Filter: FC<FilterProps> = (props) => {
  const { id, placeholder, options, onChange, fetching } = props;

  return (
    <FormItem htmlFor={id}>
      <Select
        id={id}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        fetching={fetching ?? undefined}
      />
    </FormItem>
  );
};
