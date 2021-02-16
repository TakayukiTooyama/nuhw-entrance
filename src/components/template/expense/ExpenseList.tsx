import { useDisclosure } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { ExpenseCard } from 'components/card';
import { ExpenseModal } from 'components/modal';
import { Entry } from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { VFC } from 'react';

type Props = {
  entry: Document<Entry>;
};

const ExpenseList: VFC<Props> = ({ entry }) => {
  const router = useRouter();
  const path = router.asPath.split('/')[2];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick =
    path === 'management'
      ? () => Router.push(`/expense/management/${entry.tournamentId}`)
      : onOpen;

  return (
    <>
      {entry && (
        <>
          <ExpenseModal entry={entry} isOpen={isOpen} onClose={onClose} />
          <ExpenseCard entry={entry} onClick={onClick} />
        </>
      )}
    </>
  );
};

export default ExpenseList;
