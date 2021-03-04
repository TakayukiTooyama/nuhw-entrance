import { List, ListItem } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { motion } from 'framer-motion';
import { Tournament } from 'models/users';
import React, { VFC } from 'react';
import { listItemVariants, listVariants } from 'utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
};

const MotionList = motion.custom(List);
const MotionListItem = motion.custom(ListItem);

const EntryList: VFC<Props> = ({ tournaments }) => {
  return (
    <MotionList variants={listVariants} initial="closed" animate="open">
      {tournaments.map((data) => (
        <MotionListItem key={data.id} mb={4} variants={listItemVariants}>
          <TimeLimitCard data={data} link={`/entry/${data.id}`} />
        </MotionListItem>
      ))}
    </MotionList>
  );
};

export default EntryList;
