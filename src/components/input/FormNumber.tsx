import {
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import type { VFC } from 'react';
import type { Control, FieldName } from 'react-hook-form';
import { useController } from 'react-hook-form';

type NumberInputName = {
  individualExpense: number;
  groupExpense: number;
};

type Props = {
  label: string;
  name: FieldName<NumberInputName>;
  control: Control<any, object>;
  unit?: string;
};

export const FormNumber: VFC<Props> = ({ name, control, label, unit }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControl id={name}>
      <HStack>
        <FormLabel m={0} minW="65px">
          {label}
        </FormLabel>
        <NumberInput>
          <NumberInputField ref={ref} {...inputProps} />
        </NumberInput>
        <Text>{unit}</Text>
      </HStack>
    </FormControl>
  );
};
