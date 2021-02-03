import { Stack } from '@chakra-ui/react';
import { DrawerBodyItem } from 'components/drawer';
import Router from 'next/router';
import React, { VFC } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { GrContact } from 'react-icons/gr';
import { ImProfile } from 'react-icons/im';
import { auth } from 'utils/firebase';

const DrawerBodyItemList: VFC = () => {
  // ログアウト処理
  const logout = () => {
    auth.signOut().then(() => {
      Router.push('/singin');
    });
  };

  // ドロワー内容
  const bodyItemList = [
    {
      icon: ImProfile,
      name: 'プロフィール',
      onClick: () => Router.push('/profile'),
    },
    {
      icon: GrContact,
      name: 'お問い合わせ',
      onClick: () => Router.push('/contact'),
    },
    {
      icon: AiOutlineLogout,
      name: 'ログアウト',
      onClick: logout,
    },
  ];

  return (
    <Stack spacing={4}>
      {bodyItemList.map((item) => (
        <DrawerBodyItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </Stack>
  );
};

export default DrawerBodyItemList;
