import { chakra, ChakraProps, forwardRef } from '@chakra-ui/react';
import { isValidMotionProp, motion, MotionProps } from 'framer-motion';

export const MotionBox = motion(
  forwardRef<MotionProps & ChakraProps, 'div'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );

    return <chakra.div ref={ref} {...chakraProps} />;
  })
);
