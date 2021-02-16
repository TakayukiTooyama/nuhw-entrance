import { Box, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { VoteTable } from 'components/template/expedition';
import { Vote } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  votes: Document<Vote>[];
  label: string;
};

const VoteManagementTable: VFC<Props> = ({ votes, label }) => {
  return (
    <Box mr={{ md: 8 }} mb={16} _last={{ mr: 0 }}>
      <Text textAlign="left" fontSize="20px" fontWeight="bold" mb={4}>
        {label}
      </Text>
      {votes.length == 0 ? (
        <Text textAlign="left" color="gray.400">
          投票されていません。
        </Text>
      ) : (
        <VoteTable votes={votes} />
      )}
    </Box>
  );
};

export default VoteManagementTable;
