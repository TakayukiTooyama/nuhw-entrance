import { ListItem } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { VoteConfirmCard } from 'components/card';
import { Vote } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants } from 'utils/variants';

type Props = {
  vote: Document<Vote>;
};

const VoteConfirmListItem: VFC<Props> = ({ vote }) => {
  return (
    <MotionBox as={ListItem} variants={listItemVariants} mb={4}>
      <VoteConfirmCard data={vote} />
    </MotionBox>
  );
};

export default VoteConfirmListItem;
