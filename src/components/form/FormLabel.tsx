import { Text, TextProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = TextProps & {
  label: string;
};

const FormLabel: VFC<Props> = ({ label, ...props }) => {
  return (
    <Text fontSize="18px" fontWeight="bold" {...props}>
      {label}
    </Text>
  );
};

export default FormLabel;
