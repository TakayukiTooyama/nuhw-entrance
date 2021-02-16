import {
  Flex,
  Radio,
  RadioGroup,
  RadioProps,
  Stack,
  Text,
} from '@chakra-ui/react';
import { UserInfoInForm, VoteFormInput } from 'models/users';
import React, { VFC } from 'react';
import { Control, FieldName, useController } from 'react-hook-form';

type Name = UserInfoInForm &
  VoteFormInput & {
    course: '行き' | '帰り';
  };

type Props = RadioProps & {
  name: FieldName<Name>;
  label?: string;
  radioOptions: string[];
  control: Control;
};

const FormRadio: VFC<Props> = ({ name, label, radioOptions, control }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Stack>
      <Text fontSize="20px" fontWeight="bold">
        {label}
      </Text>
      <RadioGroup ref={ref} {...inputProps}>
        <Flex wrap="wrap">
          {radioOptions?.map((value) => (
            <Radio key={value} value={value} colorScheme="orange" mr={4} mb={4}>
              {value}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Stack>
  );
};

export default FormRadio;
