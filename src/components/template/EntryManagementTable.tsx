import { Box, Text } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';

import { EntryTable } from '@/components/table';
import type { Entry } from '@/models/users';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
  gender: string;
};

export const EntryManagementTable: VFC<Props> = ({ entries, gender }) => (
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
