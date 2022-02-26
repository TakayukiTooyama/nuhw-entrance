import type { SelectProps } from '@chakra-ui/react';
import { Select, Stack, Text } from '@chakra-ui/react';
import type { VFC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

type Props = SelectProps & {
  name: string;
  label: string;
  selectOptions: string[];
  control: Control<any, object>;
};

export const FormSelect: VFC<Props> = ({
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
      <Text ml={1} fontSize={['16px', '18px']} fontWeight="bold">
        {label}
      </Text>
      <Select
        bg="white"
        size="lg"
        placeholder={placeholder}
        ref={ref}
        {...inputProps}
        {...props}
      >
        {selectOptions?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Stack>
  );
};
