import { Box, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryTable } from 'components/table';
import { Entry } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
  gender: string;
};

const EntryManagementTable: VFC<Props> = ({ entries, gender }) => {
  return (
    <Box>
      <Text textAlign="left" fontSize="20px" fontWeight="bold" mb={4}>
        {gender}
      </Text>
      {entries.length == 0 ? (
        <Text textAlign="left" color="gray.400">
          エントリーされていません。
        </Text>
      ) : (
        <EntryTable entries={entries} />
      )}
    </Box>
  );
};

export default EntryManagementTable;
