import { List } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { DrawerBodyItem } from 'components/drawer';
import { useAuth } from 'context/Auth';
import { motion } from 'framer-motion';
import { User } from 'models/users';
import Router from 'next/router';
import React, { VFC } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaAddressCard } from 'react-icons/fa';
import { FcManager } from 'react-icons/fc';
import { GrContact } from 'react-icons/gr';

const MotionList = motion.custom(List);

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const DrawerBodyItemList: VFC = () => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  // ドロワー内容
  const bodyItemList = [
    {
      icon: FaAddressCard,
      iconColor: 'red.500',
      name: '大会エントリー',
      onClick: () => Router.push('/'),
    },
    {
      icon: FcManager,
      name: '管理者引き継ぎ',
      onClick: () => Router.push('/team/management'),
    },
    // {
    //   icon: FaBusAlt,
    //   iconColor: 'teal.500',
    //   name: '遠征',
    //   onClick: () => Router.push('/expedition'),
    // },
    // {
    //   icon: RiMoneyCnyCircleFill,
    //   iconColor: 'yellow.400',
    //   name: '集金',
    //   onClick: () => Router.push('/expense'),
    // },
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
    <MotionList spacing={4} variants={variants}>
      {bodyItemList.map((item) => {
        if (item.name === '管理者引き継ぎ' && userInfo?.role !== '管理者') {
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
    </MotionList>
  );
};

export default DrawerBodyItemList;
