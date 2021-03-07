import { Flex, FlexProps, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = FlexProps & {
  text: string;
};

const CardTextTimeLimit: VFC<Props> = ({ text, ...props }) => {
  return (
    <Flex color="red.400" fontWeight="bold" {...props}>
      <Text>【期限】</Text>
      <Text>{text}</Text>
    </Flex>
  );
};

export default CardTextTimeLimit;
