import { Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  label: string;
};

const FormLabel: VFC<Props> = ({ label }) => {
  return (
    <Text fontSize="20px" fontWeight="bold">
      {label}
    </Text>
  );
};

export default FormLabel;
