import { Heading, Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryManagementTable } from 'components/template';
import { Entry } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
};

const EntryManagementTableList: VFC<Props> = ({ entries }) => {
  const maleEntryData = entries.filter((data) => data.gender === '男');
  const femaleEntryData = entries.filter((data) => data.gender === '女');

  const tables = [
    { gender: '男子', entries: maleEntryData },
    { gender: '女子', entries: femaleEntryData },
  ];

  return (
    <>
      <Heading mb={12}>{entries[0]?.tournamentName}</Heading>
      <Stack>
        {tables.map((data) => (
          <EntryManagementTable
            key={data.gender}
            entries={data.entries}
            gender={data.gender}
          />
        ))}
      </Stack>
    </>
  );
};

export default EntryManagementTableList;
