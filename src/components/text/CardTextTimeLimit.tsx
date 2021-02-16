import { HStack, Icon, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  icon?: IconType;
  text: string;
};

const CardTextTimeLimit: VFC<Props> = ({ icon, text }) => {
  return (
    <HStack color="red.400" justify="flex-end">
      {icon && <Icon as={icon} w={4} h={4} />}
      <Text fontWeight="bold">{text}</Text>
    </HStack>
  );
};

export default CardTextTimeLimit;
