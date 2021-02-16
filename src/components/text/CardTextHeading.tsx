import { Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  text: string;
};

const CardTextHeading: VFC<Props> = ({ text }) => {
  return (
    <Text isTruncated fontSize="xl" fontWeight="bold">
      {text}
    </Text>
  );
};

export default CardTextHeading;
