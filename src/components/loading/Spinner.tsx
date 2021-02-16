import { Box, Spinner, SpinnerProps } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = SpinnerProps;

const BasicSpinner: VFC<Props> = ({ size = 'xl', ...props }) => (
  <Box align="center">
    <Spinner size={size} {...props} />
  </Box>
);

export default BasicSpinner;
