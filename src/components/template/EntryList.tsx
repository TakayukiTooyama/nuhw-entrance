import { Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { Tournament } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  tournaments: Document<Tournament>[];
};

const EntryList: VFC<Props> = ({ tournaments }) => {
  return (
    <Stack spacing={4}>
      {tournaments.map((data) => (
        <TimeLimitCard
          key={data.id}
          data={data}
          link={`/entry/${data.id}`}
        ></TimeLimitCard>
      ))}
    </Stack>
  );
};

export default EntryList;
