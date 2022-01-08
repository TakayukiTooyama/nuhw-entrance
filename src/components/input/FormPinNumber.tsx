import {
  FormControl,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Control, FieldName, useController } from 'react-hook-form';

type Name = {
  day: number;
};

type Props = {
  label: string;
  name: FieldName<Name>;
  control: Control<any, object>;
  unit: string;
};

const InputPinNumber: VFC<Props> = ({ label, name, control, unit }) => {
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl>
      <FormLabel fontSize="18px" fontWeight="bold">
        {label}
      </FormLabel>
      <HStack>
        <PinInput value={value} onChange={onChange}>
          <PinInputField ref={ref} {...inputProps} />
        </PinInput>
        <Text>{unit}</Text>
      </HStack>
    </FormControl>
  );
};

export default InputPinNumber;
