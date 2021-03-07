import {
  Box,
  Divider,
  Icon,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { ConfirmCard } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { useAuth } from 'context/Auth';
import { Vote } from 'models/users';
import React, { useRef, VFC } from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaBusAlt, FaCarSide } from 'react-icons/fa';

type Props = {
  data: Document<Vote>;
};

const VoteConfirmCard: VFC<Props> = ({ data }) => {
  const { user } = useAuth();
  const toast = useToast();
  const cancelRef = useRef();
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
    <>
      <DeleteDialog
        title="投票"
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={voteDelete}
      >
        <Text>{`${data.tournamentName}の${data.day}日目 / ${data.course}の投票を完全に削除してもよろしいですか？`}</Text>
      </DeleteDialog>
      <ConfirmCard onOpen={onOpen} data={data}>
        <Stack align="center" mb={4}>
          <Text fontSize="18px">{`${data.day}日目 / ${data.course}`}</Text>
          <Divider w="150px" />
          {data.busInfo !== '' && (
            <Box fontSize="20px" fontWeight="bold">
              <Text>
                <Icon as={FaBusAlt} w={6} h={6} mr={2} />
                {`${data.busInfo.turn}便 / ${data.busInfo.busNumber}号車`}
              </Text>
              <Text>
                <Icon as={AiOutlineFieldTime} w={6} h={6} mr={2} />
                {`出発時間 : ${data.busInfo.departureTime}`}
              </Text>
            </Box>
          )}
          {data.carInfo !== '' && (
            <Text fontSize="20px" fontWeight="bold">
              <Icon as={FaCarSide} w={6} h={6} mr={2} />
              {`${data.carInfo.carName}`}
            </Text>
          )}
        </Stack>
      </ConfirmCard>
    </>
  );
};

export default VoteConfirmCard;
