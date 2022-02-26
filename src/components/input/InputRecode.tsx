import { NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = {
  value: string;
  onChange: (valueAsString: string) => void;
};

export const InputRecode: VFC<Props> = ({ value, onChange }) => (
  <>
    <Text mr={4}>記録</Text>
    <NumberInput value={value} onChange={onChange}>
      <NumberInputField />
    </NumberInput>
  </>
);
