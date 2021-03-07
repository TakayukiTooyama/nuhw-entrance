import { Box, BoxProps, Heading } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = BoxProps & {
  title: string;
};

const FormHeading: VFC<Props> = ({ title, ...props }) => {
  return (
    <Box pb={12} align="center" {...props}>
      <Heading as="h1" size="lg">
        {title}
      </Heading>
    </Box>
  );
};

export default FormHeading;
