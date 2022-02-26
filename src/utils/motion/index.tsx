import type { ChakraProps } from '@chakra-ui/react';
import { chakra, forwardRef } from '@chakra-ui/react';
import type { MotionProps } from 'framer-motion';
import { isValidMotionProp, motion } from 'framer-motion';

export const MotionBox = motion(
  forwardRef<MotionProps & ChakraProps, 'div'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );

    return <chakra.div ref={ref} {...chakraProps} />;
  })
);
