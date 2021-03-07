import { List, ListItem } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { Tournament } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants, listVariants } from 'utils/variants';

type Props = {
  tournaments: Document<Tournament>[];
};

const EntryList: VFC<Props> = ({ tournaments }) => {
  return (
    <MotionBox
      as={List}
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {tournaments.map((data) => (
        <MotionBox
          as={ListItem}
          key={data.id}
          mb={4}
          variants={listItemVariants}
        >
          <TimeLimitCard data={data} link={`/entry/${data.id}`} />
        </MotionBox>
      ))}
    </MotionBox>
  );
};

export default EntryList;
