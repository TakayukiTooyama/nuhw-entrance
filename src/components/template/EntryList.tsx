import { List, ListItem } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';

import { TimeLimitCard } from '@/components/card';
import type { Tournament } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listItemVariants, listVariants } from '@/utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
};

export const EntryList: VFC<Props> = ({ tournaments }) => (
  <MotionBox as={List} variants={listVariants} initial="closed" animate="open">
    {tournaments.map((data) => (
      <MotionBox as={ListItem} key={data.id} mb={4} variants={listItemVariants}>
        <TimeLimitCard data={data} link={`/entry/${data.id}`} />
      </MotionBox>
    ))}
  </MotionBox>
);
