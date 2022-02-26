import type { TextProps } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = TextProps & {
  text: string;
};

export const CardTextHeading: VFC<Props> = ({ text, ...props }) => (
  <Text isTruncated fontSize="xl" fontWeight="bold" {...props}>
    {text}
  </Text>
);
