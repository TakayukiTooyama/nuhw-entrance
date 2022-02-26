import { List } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';

import { EntryManagementListItem } from '@/components/template';
import type { Tournament, UserInfo } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listVariants } from '@/utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
  userInfo: UserInfo;
};

export const EntryManagementList: VFC<Props> = ({ tournaments, userInfo }) => (
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
