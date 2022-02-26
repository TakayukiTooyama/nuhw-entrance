import type { BoxProps } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { VFC } from 'react';

import type { LinkContent } from '@/models/users';

type Props = BoxProps & {
  item: LinkContent;
};

const boxStyles = {
  w: '100%',
  h: 200,
  shadow: 'base',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '30px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const boxAfterStyle = {
  content: `""`,
  w: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  bgGradient: 'linear(to-l,transparent, #000 60%)',
};

const backgroundImage = {
  w: '70%',
  h: 200,
  right: -10,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const textStyle = {
  color: 'white',
  bgClip: 'text',
  bgGradient: 'linear(to-l, #FF57B9, #A704FD)',
  fontSize: ['25px', '30px'],
  fontWeight: 'bold',
  top: '50%',
  left: '15%',
  transform: 'translateY(-50%)',
  zIndex: '1',
};

export const LinkImageCard: VFC<Props> = ({ item, ...props }) => (
  <Link href={`/${item.link}/${item.id}`} passHref>
    <Box pos="relative" {...boxStyles} _after={{ ...boxAfterStyle }} {...props}>
      <Box
        pos="absolute"
        backgroundImage={`url(${item.image})`}
        {...backgroundImage}
      />
      <Text pos="absolute" {...textStyle}>
        {item.name}
      </Text>
    </Box>
  </Link>
);
