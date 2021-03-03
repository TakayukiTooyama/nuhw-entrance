import { Text, useDisclosure, useToast } from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { ConfirmCard } from 'components/card';
import { useAuth } from 'context/Auth';
import { Vote } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  data: Document<Vote>;
};

const VoteConfirmCard: VFC<Props> = ({ data }) => {
  const { user } = useAuth();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const voteDelete = async () => {
    await fuego.db
      .doc(`/users/${user?.uid}/votes/${data.id}`)
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
    <ConfirmCard
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      data={data}
      onDelete={voteDelete}
    >
      <Text>{`${data.day}日目`}</Text>
      <Text>{`${data.course}`}</Text>
      {data.busInfo !== '' && (
        <>
          <Text>{`${data.busInfo.turn}便 / ${data.busInfo.busNumber}号車`}</Text>
          <Text>{`出発時間：${data.busInfo.departureTime}`}</Text>
        </>
      )}
      {data.carInfo !== '' && <Text>{`${data.carInfo.carName}`}</Text>}
    </ConfirmCard>
  );
};

export default VoteConfirmCard;
