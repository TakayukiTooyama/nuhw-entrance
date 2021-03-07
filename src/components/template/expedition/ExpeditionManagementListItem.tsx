import { ListItem, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { TimeLimitCard } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { Expedition, UserInfo } from 'models/users';
import React, { useRef, VFC } from 'react';
import { MotionBox } from 'utils/motion';
import { listItemVariants } from 'utils/variants';

type Props = {
  expedition: Document<Expedition>;
  userInfo: UserInfo;
};

const ExpeditionManagementListItem: VFC<Props> = ({ expedition, userInfo }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const deleteExpedition = async () => {
    await fuego.db
      .doc(`teams/${userInfo?.teamId}/expeditions/${expedition.id}`)
      .delete()
      .then(() => {
        onClose();
        toast({
          title: '成功',
          description: '投票を削除しました。',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });
      });
  };

  return (
    <MotionBox as={ListItem} variants={listItemVariants}>
      <TimeLimitCard
        data={expedition}
        link={`/expedition/management/${expedition.id}`}
        onOpen={onOpen}
      >
        <Text
          fontWeight="bold"
          align="center"
        >{`${expedition.day}日目 / ${expedition.course}`}</Text>
      </TimeLimitCard>
      <DeleteDialog
        title="投票"
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={deleteExpedition}
      >
        <Text>{`${expedition.tournamentName}の${expedition.day}日目 / ${expedition.course}の投票は削除されます。`}</Text>
      </DeleteDialog>
    </MotionBox>
  );
};

export default ExpeditionManagementListItem;
