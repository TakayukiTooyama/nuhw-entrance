import { Text, TextProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = TextProps & {
  text: string;
};

const CardTextHeading: VFC<Props> = ({ text, ...props }) => {
  return (
    <Text isTruncated fontSize="xl" fontWeight="bold" {...props}>
      {text}
    </Text>
  );
};

export default CardTextHeading;
