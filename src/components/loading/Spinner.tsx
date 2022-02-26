import type { SpinnerProps } from '@chakra-ui/react';
import { Box, Spinner } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = SpinnerProps;

export const BasicSpinner: VFC<Props> = ({ size = 'lg', ...props }) => (
  <Box align="center">
    <Spinner size={size} {...props} color="gray.400" />
  </Box>
);
