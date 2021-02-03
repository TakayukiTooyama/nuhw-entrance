import { HStack, Icon, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  name: string;
  icon: IconType;
  onClick: () => void;
};

const DrawerBodyItem: VFC<Props> = ({ name, icon, onClick }) => (
  <HStack spacing={4} onClick={onClick}>
    <Icon as={icon} w={6} h={6} />
    <Text fontSize="20px">{name}</Text>
  </HStack>
);

export default DrawerBodyItem;
