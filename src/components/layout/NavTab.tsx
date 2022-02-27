import { Box, HStack, Icon, Text } from '@chakra-ui/react';
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
    <Box w="100%" py={3} cursor="pointer" _hover={{ bg: 'gray.100' }}>
      <HStack align="center" justify="center">
        <Icon as={icon} fontSize="23px" />
        <Text fontSize="12px">{name}</Text>
      </HStack>
    </Box>
  </Link>
);
