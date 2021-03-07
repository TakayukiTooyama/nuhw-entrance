import { List, ListItem, Stack, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { EntryConfirmCard } from 'components/card';
import { Spinner } from 'components/loading';
import { Entry } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants, listVariants } from 'utils/variants';

type Props = {
  entries: Document<Entry>[];
};

const EntryConfirmList: VFC<Props> = ({ entries }) => (
  <Stack spacing={6}>
    <MotionBox
      as={List}
      spacing={6}
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {entries ? (
        entries.map((data) => (
          <MotionBox
            as={ListItem}
            key={data.tournamentId}
            variants={listItemVariants}
          >
            <EntryConfirmCard data={data} />
          </MotionBox>
        ))
      ) : (
        <Spinner />
      )}
    </MotionBox>
    <Text textAlign="left" color="gray.400" px={4}>
      ※エントリーを変更したい場合は、一度削除し、再びエントリーしてください。
    </Text>
  </Stack>
);

export default EntryConfirmList;
