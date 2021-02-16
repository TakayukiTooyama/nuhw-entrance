import { Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryConfirmCard } from 'components/card';
import { Spinner } from 'components/loading';
import { Entry } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  entries: Document<Entry>[];
};

const EntryConfirmList: VFC<Props> = ({ entries }) => {
  return (
    <Stack align="centr" spacing={4}>
      {entries ? (
        entries.map((data) => (
          <EntryConfirmCard key={data.tournamentId} data={data} />
        ))
      ) : (
        <Spinner />
      )}
    </Stack>
  );
};

export default EntryConfirmList;
