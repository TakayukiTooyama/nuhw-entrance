import { HStack, Text } from '@chakra-ui/react';
import { Card } from 'components/card';
import {
  CardTextHeading,
  CardTextSchedule,
  CardTextTimeLimit,
} from 'components/text';
import { Entry } from 'models/users';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import {
  formatPriceNotation,
  formatTimeLimitNotation,
  formatWeekdayNotation,
} from 'utils/format';

type Props = {
  entry: Entry;
  onClick: () => void;
};

const ExpenseManagementCard: VFC<Props> = ({ entry, onClick }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[2];

  return (
    <Card onClick={onClick} cursor="pointer" bg="gray.50" innerPadding={4}>
      <CardTextSchedule
        color="gray.400"
        startDate={formatWeekdayNotation(entry.startDate)}
        endDate={formatWeekdayNotation(entry.endDate)}
      />
      <CardTextHeading text={entry.tournamentName} />
      <HStack
        spacing={4}
        my={6}
        p={4}
        fontWeight="bold"
        shadow="base"
        justify="center"
        bg="white"
      >
        {path === 'management' ? (
          <>
            <Text>
              個人種目
              {formatPriceNotation(entry.expense.individual)}
            </Text>
            <Text>団体種目{formatPriceNotation(entry.expense.group)}</Text>
          </>
        ) : (
          <Text>エントリー費：{formatPriceNotation(entry.totalExpenses)}</Text>
        )}
      </HStack>
      <CardTextTimeLimit
        text={`【集金日】 ${formatTimeLimitNotation(entry.timeLimit)}`}
      />
    </Card>
  );
};

export default ExpenseManagementCard;
