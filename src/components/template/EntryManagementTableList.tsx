import { Heading, Stack } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryManagementTable } from 'components/template';
import { Entry } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
};

const EntryManagementTableList: VFC<Props> = ({ entries }) => {
  const firstGrade = entries.filter((data) => data.grade === '1年');
  const secondGrade = entries.filter((data) => data.grade === '2年');
  const thirdGrade = entries.filter((data) => data.grade === '3年');
  const fourthGrade = entries.filter(
    (data) =>
      data.grade === '4年' || data.grade === '院1' || data.grade === '院2'
  );

  const tables = [
    { grade: '1年生', entries: firstGrade },
    { grade: '2年生', entries: secondGrade },
    { grade: '3年生', entries: thirdGrade },
    { grade: '4年生・院生', entries: fourthGrade },
  ];

  return (
    <>
      <Heading mb={12}>{entries[0]?.tournamentName}</Heading>
      <Stack>
        {tables.map((data) => (
          <EntryManagementTable
            key={data.grade}
            entries={data.entries}
            grade={data.grade}
          />
        ))}
      </Stack>
    </>
  );
};

export default EntryManagementTableList;
