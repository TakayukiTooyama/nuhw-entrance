import { Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { Tournament } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  tournaments: Document<Tournament>[];
};

const EntryManagementList: VFC<Props> = ({ tournaments }) => {
  return (
    <Stack spacing={4} w="100%">
      {tournaments.map((data) => (
        <TimeLimitCard
          key={data.tournamentName}
          data={data}
          link={`/entry/management/${data.id}`}
        />
      ))}
    </Stack>
  );
};

export default EntryManagementList;
