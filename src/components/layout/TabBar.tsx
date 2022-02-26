import { Box } from '@chakra-ui/react';
import type { VFC } from 'react';
import { FaAddressCard } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

import { NavTab } from '@/components/layout';
// import { RiMoneyCnyCircleFill } from 'react-icons/ri';

const navList = [
  { name: 'エントリー', icon: FaAddressCard, link: `/` },
  { name: 'ユニフォーム', icon: GiClothes, link: `/uniform` },
];

export const TabBar: VFC = () => (
  <>
    <Box
      pos="fixed"
      bottom="0"
      w="100%"
      textAlign="center"
      display={['flex', 'flex', 'none']}
      borderTop="1px solid"
      borderColor="gray.100"
      zIndex="2"
      overflow="hidden"
      bg="white"
    >
      {navList.map((item) => (
        <NavTab
          key={item.name}
          name={item.name}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </Box>
  </>
);
