import {
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  Text,
} from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = NumberInputProps & {
  value: string;
  label?: string;
  unit?: string;
  setValue: (valueAsString: string) => void;
};

const InputNumber: VFC<Props> = ({
  value,
  label,
  unit,
  setValue,
  ...props
}) => {
  return (
    <HStack>
      <Text>{label}</Text>
      <NumberInput
        {...props}
        value={value}
        onChange={(valueAsString) => setValue(valueAsString)}
      >
        <NumberInputField />
      </NumberInput>
      <Text>{unit}</Text>
    </HStack>
  );
};

export default InputNumber;
