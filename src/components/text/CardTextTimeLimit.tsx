import type { FlexProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = FlexProps & {
  text: string;
};

export const CardTextTimeLimit: VFC<Props> = ({ text, ...props }) => (
  <Flex color="red.400" fontWeight="bold" {...props}>
    <Text>【期限】</Text>
    <Text>{text}</Text>
  </Flex>
);
