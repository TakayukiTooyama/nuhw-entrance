import type { RadioProps } from '@chakra-ui/react';
import { Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import type { VFC } from 'react';
import type { Control, FieldName } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { UserInfoInForm } from '@/models/users';

type Props = RadioProps & {
  name: FieldName<UserInfoInForm>;
  label?: string;
  radioOptions: string[];
  control: Control<any, object>;
};

export const FormRadio: VFC<Props> = ({
  name,
  label,
  radioOptions,
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
      <RadioGroup ref={ref} {...inputProps}>
        <Flex wrap="wrap">
          {radioOptions?.map((value) => (
            <Radio
              key={value}
              value={value}
              colorScheme="teal"
              mr={4}
              mb={4}
              {...props}
            >
              {value}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Stack>
  );
};
