import { Select, SelectProps, Stack, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Control, FieldName, useController } from 'react-hook-form';

type Name = {
  name: string;
};

type Props = SelectProps & {
  name: FieldName<Name>;
  label: string;
  selectOptions: string[];
  control: Control;
};

const FormSelect: VFC<Props> = ({
  placeholder,
  name,
  label,
  selectOptions,
  control,
  ...props
}) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Stack>
      <Text fontSize="18px" fontWeight="bold">
        {label}
      </Text>
      <Select
        placeholder={placeholder}
        ref={ref}
        {...inputProps}
        {...props}
        size="lg"
      >
        {/* あとでkeyにidxを入れるのを変更する */}
        {selectOptions?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default FormSelect;
