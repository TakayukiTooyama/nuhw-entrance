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
  setValue?: (valueAsString: string) => void;
};

const InputNumber: VFC<Props> = ({
  value,
  label,
  unit,
  setValue,
  ...props
}) => (
  <HStack>
    {label && <Text>{label}</Text>}
    <NumberInput
      bg="white"
      value={value}
      onChange={(valueAsString) => setValue(valueAsString)}
      {...props}
    >
      <NumberInputField autoFocus />
    </NumberInput>
    {unit && <Text>{unit}</Text>}
  </HStack>
);

export default InputNumber;
