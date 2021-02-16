import { HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  value: string;
  label?: string;
  unit?: string;
  setValue: (value: string) => void;
};

const InputPinNumber: VFC<Props> = ({ value, label, unit, setValue }) => {
  return (
    <HStack>
      <Text>{label}</Text>
      <PinInput value={value} onChange={(value) => setValue(value)}>
        <PinInputField />
      </PinInput>
      <Text>{unit}</Text>
    </HStack>
  );
};

export default InputPinNumber;
