import { Box, Spinner, SpinnerProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = SpinnerProps;

const BasicSpinner: VFC<Props> = ({ size = 'lg', ...props }) => (
  <Box align="center">
    <Spinner size={size} {...props} color="gray.400" />
  </Box>
);

export default BasicSpinner;
