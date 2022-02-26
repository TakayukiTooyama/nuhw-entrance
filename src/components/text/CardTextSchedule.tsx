import type { StackProps } from '@chakra-ui/react';
import { HStack, Text } from '@chakra-ui/react';
import type { VFC } from 'react';

type Props = StackProps & {
  startDate: string;
  endDate?: string;
};

export const CardTextSchedule: VFC<Props> = ({
  startDate,
  endDate,
  ...props
}) => {
  // 開催日が1日だけだった場合と表記を変える
  const isOneDateHold = startDate === endDate || !endDate;

  return (
    <>
      {isOneDateHold ? (
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
