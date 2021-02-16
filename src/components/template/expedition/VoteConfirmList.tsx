import { Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { VoteConfirmCard } from 'components/card';
import { Vote } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  votes: Document<Vote>[];
};

const VoteConfirmList: VFC<Props> = ({ votes }) => {
  return (
    <Stack spacing={4}>
      {votes.map((data) => (
        <VoteConfirmCard key={data.id} data={data} />
      ))}
    </Stack>
  );
};

export default VoteConfirmList;
