import { HStack, StackProps, Text } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = StackProps & {
  startDate: string;
  endDate?: string;
};

const CardTextSchedule: VFC<Props> = ({ startDate, endDate, ...props }) => {
  // 開催日が1日だけだった場合と表記を変える
  const oneDateHold = startDate === endDate || !endDate;

  return (
    <>
      {oneDateHold ? (
        <HStack {...props}>
          <Text>{startDate}</Text>
        </HStack>
      ) : (
        <HStack {...props}>
          <Text>{startDate}</Text>
          <Text>〜</Text>
          <Text>{endDate}</Text>
        </HStack>
      )}
    </>
  );
};

export default CardTextSchedule;
