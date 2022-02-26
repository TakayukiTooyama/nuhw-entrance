import type { BoxProps } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = BoxProps & {
  title: string;
};

export const FormHeading: VFC<Props> = ({ title, ...props }) => (
  <Box pb={12} align="center" {...props}>
    <Heading as="h1" size="lg">
      {title}
    </Heading>
  </Box>
);
