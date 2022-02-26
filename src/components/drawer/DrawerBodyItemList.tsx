import { List } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import Router from 'next/router';
import type { VFC } from 'react';
import { FaAddressCard } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
import { IoIosPeople } from 'react-icons/io';
import { MdDescription } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { SiMinutemailer } from 'react-icons/si';

import { DrawerBodyItem } from '@/components/drawer';
import { useAuth } from '@/context/Auth';
import type { User } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listVariants } from '@/utils/variants';

export const DrawerBodyItemList: VFC = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  // ドロワー内容
  const bodyItemList = [
    {
      icon: FaAddressCard,
      iconColor: 'gray.500',
      name: '大会エントリー',
      onClick: () => Router.push('/'),
    },
    {
      icon: GiClothes,
      iconColor: 'gray.500',
      name: 'ユニフォーム',
      onClick: () => Router.push('/uniform'),
    },
    {
      icon: ImProfile,
      iconColor: 'gray.500',
      name: 'プロフィール設定',
      onClick: () => Router.push('/profile'),
    },
    {
      icon: IoIosPeople,
      iconColor: 'gray.500',
      name: '管理者引き継ぎ',
      onClick: () => Router.push('/team/management'),
    },
    {
      icon: SiMinutemailer,
      iconColor: 'gray.500',
      name: 'お問い合わせ',
      onClick: () => Router.push('https://forms.gle/7NfKAdVBseASLbWH6'),
    },
    {
      icon: MdDescription,
      iconColor: 'gray.500',
      name: '取扱説明書',
      onClick: () =>
        Router.push(
          'https://www.canva.com/design/DAEYtUhZmYQ/6lI-C3Px3fM6UD-nZzfBgQ/view'
        ),
    },
    {
      icon: RiLogoutBoxLine,
      iconColor: 'gray.500',
      name: 'ログアウト',
      onClick: logout,
    },
  ];

  return (
    <MotionBox as={List} spacing={4} variants={listVariants}>
      {bodyItemList.map((item) => {
        if (item.name === '管理者引き継ぎ' && userInfo?.role !== '管理者') {
          return false;
        }
        if (item.name === '取扱説明書' && userInfo?.name === 'デモ太朗') {
          return false;
        }
        return (
          <DrawerBodyItem
            key={item.name}
            name={item.name}
            icon={item.icon}
            iconColor={item.iconColor}
            onClick={item.onClick}
          />
        );
      })}
    </MotionBox>
  );
};
