import { Divider, HStack, Icon, ListItem, Text } from '@chakra-ui/react';
import type { VFC } from 'react';
import type { IconType } from 'react-icons';

import { MotionBox } from '@/utils/motion';

type Props = {
  name: string;
  icon: IconType;
  iconColor: string;
  onClick: () => void;
};

export const DrawerBodyItem: VFC<Props> = ({
  name,
  icon,
  iconColor,
  onClick,
}) => (
  <>
    <MotionBox
      as={ListItem}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <HStack spacing={4} onClick={onClick} cursor="pointer">
        <Icon as={icon} w={6} h={6} color={iconColor} />
        <Text fontSize={{ md: '20px' }}>{name}</Text>
      </HStack>
    </MotionBox>
    {name === 'プロフィール設定' && <Divider my={4} />}
  </>
);
