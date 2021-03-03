import { HStack, Icon, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  name: string;
  icon: IconType;
  iconColor: string;
  onClick: () => void;
};

const DrawerBodyItem: VFC<Props> = ({ name, icon, iconColor, onClick }) => {
  return (
    <HStack spacing={4} onClick={onClick} cursor="pointer">
      <Icon as={icon} w={6} h={6} color={iconColor} />
      <Text fontSize={{ md: '20px' }}>{name}</Text>
    </HStack>
  );
};

export default DrawerBodyItem;
