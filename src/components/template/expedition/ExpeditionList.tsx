import { Stack, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { Expedition } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  expeditions: Document<Expedition>[];
};

const ExpeditionList: VFC<Props> = ({ expeditions }) => {
  return (
    <Stack spacing={4}>
      {expeditions.map((data) => (
        <TimeLimitCard
          key={data.id}
          data={data}
          link={`/expedition/${data.id}`}
        >
          <Text>{`${data.day}日目 / ${data.course}`}</Text>
        </TimeLimitCard>
      ))}
    </Stack>
  );
};

export default ExpeditionList;
