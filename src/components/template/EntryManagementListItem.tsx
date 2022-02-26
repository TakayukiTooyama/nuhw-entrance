import { ListItem, Text, useDisclosure, useToast } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import { fuego } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';
import { useRef } from 'react';

import { TimeLimitCard } from '@/components/card';
import { DeleteDialog } from '@/components/dialog';
import type { Tournament, UserInfo } from '@/models/users';
import { MotionBox } from '@/utils/motion';
import { listItemVariants } from '@/utils/variants';

type Props = {
  tournament: Document<Tournament>;
  userInfo: UserInfo;
};

export const EntryManagementListItem: VFC<Props> = ({
  tournament,
  userInfo,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const createdEntryDelete = async () => {
    await fuego.db
      .doc(`teams/${userInfo?.teamId}/tournaments/${tournament.id}`)
      .update({ view: false })
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
      {tournament.view === true && (
        <MotionBox as={ListItem} variants={listItemVariants} mb={4}>
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
        </MotionBox>
      )}
    </>
  );
};
