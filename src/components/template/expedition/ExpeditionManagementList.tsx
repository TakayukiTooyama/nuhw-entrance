import { List } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { ExpeditionManagementListItem } from 'components/template/expedition';
import { Expedition, UserInfo } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listVariants } from 'utils/variants';

type Props = {
  expeditions: Document<Expedition>[];
  userInfo: UserInfo;
};
const ExpeditionManagementList: VFC<Props> = ({ expeditions, userInfo }) => (
  <MotionBox
    as={List}
    w="100%"
    spacing={6}
    variants={listVariants}
    initial="closed"
    animate="open"
  >
    {expeditions.map((data) => (
      <ExpeditionManagementListItem
        key={data.id}
        expedition={data}
        userInfo={userInfo}
      />
    ))}
  </MotionBox>
);

export default ExpeditionManagementList;
