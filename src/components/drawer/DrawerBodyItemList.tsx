import { Stack } from '@chakra-ui/react';
import { DrawerBodyItem } from 'components/drawer';
import { useAuth } from 'context/Auth';
import Router from 'next/router';
import React, { VFC } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaAddressCard, FaBusAlt } from 'react-icons/fa';
import { GrContact } from 'react-icons/gr';
import { RiMoneyCnyCircleFill } from 'react-icons/ri';

const DrawerBodyItemList: VFC = () => {
  const { logout } = useAuth();

  // ドロワー内容
  const bodyItemList = [
    {
      icon: FaAddressCard,
      iconColor: 'red.500',
      name: '大会エントリー',
      onClick: () => Router.push('/'),
    },
    {
      icon: FaBusAlt,
      iconColor: 'teal.500',
      name: '遠征',
      onClick: () => Router.push('/expedition'),
    },
    {
      icon: RiMoneyCnyCircleFill,
      iconColor: 'yellow.400',
      name: '集金',
      onClick: () => Router.push('/expense'),
    },
    {
      icon: GrContact,
      iconColor: 'gray.500',
      name: 'お問い合わせ',
      onClick: () => Router.push('https://forms.gle/7NfKAdVBseASLbWH6'),
    },
    {
      icon: BiLogOut,
      iconColor: 'orange.500',
      name: 'ログアウト',
      onClick: logout,
    },
  ];

  return (
    <Stack spacing={6}>
      {bodyItemList.map((item) => (
        <DrawerBodyItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          iconColor={item.iconColor}
          onClick={item.onClick}
        />
      ))}
    </Stack>
  );
};

export default DrawerBodyItemList;
