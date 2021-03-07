import { List, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { VoteConfirmListItem } from 'components/template/expedition';
import { Vote } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listVariants } from 'utils/variants';

type Props = {
  votes: Document<Vote>[];
};

const VoteConfirmList: VFC<Props> = ({ votes }) => {
  return (
    <>
      <MotionBox
        as={List}
        spacing={6}
        variants={listVariants}
        initial="closed"
        animate="open"
      >
        {votes.map((data) => (
          <VoteConfirmListItem key={data.id} vote={data} />
        ))}
      </MotionBox>
      <Text textAlign="left" color="gray.400" px={4}>
        ※投票を変更したい場合は、一度削除し、再び投票してください。
      </Text>
    </>
  );
};

export default VoteConfirmList;
