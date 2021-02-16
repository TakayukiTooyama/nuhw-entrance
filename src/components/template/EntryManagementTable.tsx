import { Box, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryTable, ExpenseTable } from 'components/table';
import { Entry } from 'models/users';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
  grade: string;
};

const EntryManagementTable: VFC<Props> = ({ entries, grade }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[1];

  return (
    <Box mr={{ md: 8 }} mb={16} _last={{ mr: 0 }}>
      <Text textAlign="left" fontSize="20px" fontWeight="bold" mb={4}>
        {grade}
      </Text>
      {entries.length == 0 ? (
        <Text textAlign="left" color="gray.400">
          エントリーされていません。
        </Text>
      ) : path === 'entry' ? (
        <EntryTable entries={entries} />
      ) : (
        <ExpenseTable entries={entries} />
      )}
    </Box>
  );
};

export default EntryManagementTable;
