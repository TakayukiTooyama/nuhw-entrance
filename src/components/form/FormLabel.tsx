import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = TextProps & {
  label: string;
};

export const FormLabel: VFC<Props> = ({ label, ...props }) => (
  <Text fontSize="18px" fontWeight="bold" {...props}>
    {label}
  </Text>
);
