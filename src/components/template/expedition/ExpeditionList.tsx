import { List, ListItem, Text } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { Expedition } from 'models/users';
import React, { VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants, listVariants } from 'utils/variants';

type Props = {
  expeditions: Document<Expedition>[];
};

const ExpeditionList: VFC<Props> = ({ expeditions }) => {
  return (
    <MotionBox
      as={List}
      spacing={6}
      variants={listVariants}
      initial="closed"
      animate="open"
    >
      {expeditions.map((data) => (
        <MotionBox as={ListItem} key={data.id} variants={listItemVariants}>
          <TimeLimitCard data={data} link={`/expedition/${data.id}`}>
            <Text
              fontWeight="bold"
              align="center"
            >{`${data.day}日目 / ${data.course}`}</Text>
          </TimeLimitCard>
        </MotionBox>
      ))}
    </MotionBox>
  );
};

export default ExpeditionList;
