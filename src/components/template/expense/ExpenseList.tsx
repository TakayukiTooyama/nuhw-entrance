import { useDisclosure } from '@chakra-ui/react';
import { ExpenseCard } from 'components/card';
import { ExpenseModal } from 'components/modal';
import { Expense } from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { VFC } from 'react';

type Props = {
  expense: Expense;
};

const ExpenseList: VFC<Props> = ({ expense }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[2];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick =
    path === 'management'
      ? () => Router.push(`/expense/management/${expense.tournamentId}`)
      : onOpen;

  return (
    <>
      {expense && (
        <>
          <ExpenseModal expense={expense} isOpen={isOpen} onClose={onClose} />
          <ExpenseCard expense={expense} onClick={onClick} />
        </>
      )}
    </>
  );
};

export default ExpenseList;
