import { NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  value: string;
  onChange: (valueAsString: string) => void;
};

const RecodeInput: VFC<Props> = ({ value, onChange }) => {
  return (
    <>
      <Text mr={4}>記録</Text>
      <NumberInput value={value} onChange={onChange}>
        <NumberInputField />
      </NumberInput>
    </>
  );
};
export default RecodeInput;
