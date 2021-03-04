import { List } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryManagementListItem } from 'components/template';
import { motion } from 'framer-motion';
import { Tournament, UserInfo } from 'models/users';
import React, { VFC } from 'react';
import { listVariants } from 'utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
  userInfo: UserInfo;
};

const MotionList = motion.custom(List);

const EntryManagementList: VFC<Props> = ({ tournaments, userInfo }) => {
  return (
    <MotionList
      w="100%"
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {tournaments.map((data) => (
        <EntryManagementListItem
          key={data.id}
          tournament={data}
          userInfo={userInfo}
        />
      ))}
    </MotionList>
  );
};

export default EntryManagementList;
