import { Box, Icon, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { VFC } from 'react';
import type { IconType } from 'react-icons/lib';

type Props = {
  name: string;
  icon: IconType;
  link: string;
};

export const NavTab: VFC<Props> = ({ name, icon, link }) => (
  <Link href={link} passHref>
    <Box w="100%" py={2} cursor="pointer" _hover={{ bg: 'gray.100' }}>
      <Icon as={icon} fontSize="23px" />
      <Text as="sub" fontSize="8px">
        {name}
      </Text>
    </Box>
  </Link>
);
