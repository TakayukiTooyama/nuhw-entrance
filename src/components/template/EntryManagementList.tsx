import { Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { Tournament, UserInfo } from 'models/users';
import React, { useRef, VFC } from 'react';

type Props = {
  tournament: Document<Tournament>;
  userInfo: UserInfo;
};

const EntryManagementList: VFC<Props> = ({ tournament, userInfo }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const createdEntryDelete = async () => {
    await fuego.db
      .doc(`teams/${userInfo?.teamId}/tournaments/${tournament.id}`)
      .delete()
      .then(() => {
        onClose();
        toast({
          title: '成功',
          description: 'エントリーを削除しました。',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
      });
  };

  return (
    <>
      <DeleteDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={createdEntryDelete}
      >
        <Text>{tournament.tournamentName}のエントリーは削除されます。</Text>
      </DeleteDialog>
      <TimeLimitCard
        data={tournament}
        link={`/entry/management/${tournament.id}`}
        onOpen={onOpen}
      />
    </>
  );
};

export default EntryManagementList;
