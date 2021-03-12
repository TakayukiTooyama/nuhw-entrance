import { Box } from '@chakra-ui/react';
import { NavTab } from 'components/layout';
import React, { VFC } from 'react';
import { FaAddressCard, FaBusAlt } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
// import { RiMoneyCnyCircleFill } from 'react-icons/ri';

const navList = [
  { name: 'エントリー', icon: FaAddressCard, link: `/` },
  { name: '遠征', icon: FaBusAlt, link: `/expedition` },
  // { name: '集金', icon: RiMoneyCnyCircleFill, link: `/expense` },
  { name: 'ユニフォーム', icon: GiClothes, link: `/uniform` },
];

const TabBar: VFC = () => {
  return (
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
};

export default TabBar;
