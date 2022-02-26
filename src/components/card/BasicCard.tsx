import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { FC } from 'react';

type Props = BoxProps & {
  align?: string;
  innerWidth?: string;
  innerPadding?: number;
};

export const BasicCard: FC<Props> = ({
  children,
  innerWidth = '100%',
  align = 'left',
  innerPadding = 8,
  ...props
}) => (
  <Box w="100%" shadow="base" borderRadius="16px" bg="white" {...props}>
    <Box maxW={innerWidth} align={align} p={innerPadding}>
      {children}
    </Box>
  </Box>
);
