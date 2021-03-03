import { HStack, Text } from '@chakra-ui/react';
import { Card } from 'components/card';
import {
  CardTextHeading,
  CardTextSchedule,
  // CardTextTimeLimit,
} from 'components/text';
import { Expense } from 'models/users';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import {
  formatPriceNotation,
  // formatTimeLimitNotation,
  formatWeekdayNotation,
} from 'utils/format';

type Props = {
  expense: Expense;
  onClick: () => void;
};

const ExpenseManagementCard: VFC<Props> = ({ expense, onClick }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[2];

  return (
    <Card onClick={onClick} cursor="pointer" bg="gray.50" innerPadding={4}>
      <CardTextSchedule
        color="gray.400"
        startDate={formatWeekdayNotation(expense.startDate)}
        endDate={formatWeekdayNotation(expense.endDate)}
      />
      <CardTextHeading text={expense.tournamentName} />
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
              {formatPriceNotation(expense.expense.individual)}
            </Text>
            <Text>団体種目{formatPriceNotation(expense.expense.group)}</Text>
          </>
        ) : (
          <Text>
            エントリー費：{formatPriceNotation(expense.totalExpenses)}
          </Text>
        )}
      </HStack>
      {/* <CardTextTimeLimit
        text={`【集金日】 ${formatTimeLimitNotation(expense.timeLimit)}`}
      /> */}
    </Card>
  );
};

export default ExpenseManagementCard;
