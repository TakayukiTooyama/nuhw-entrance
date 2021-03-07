import { List } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryManagementListItem } from 'components/template';
import { Tournament, UserInfo } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listVariants } from 'utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
  userInfo: UserInfo;
};

const EntryManagementList: VFC<Props> = ({ tournaments, userInfo }) => {
  return (
    <MotionBox
      w="100%"
      spacing={6}
      as={List}
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
    </MotionBox>
  );
};

export default EntryManagementList;
