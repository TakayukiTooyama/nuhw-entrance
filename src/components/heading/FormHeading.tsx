import { Box, Heading } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  title: string;
};

const FormHeading: VFC<Props> = ({ title }) => {
  return (
    <Box pb={12} align="center">
      <Heading as="h1" size="lg">
        {title}
      </Heading>
    </Box>
  );
};

export default FormHeading;
