import {
  Box,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { ConfirmCard } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import React, { useRef, VFC } from 'react';

type Props = {
  data: Document<Entry>;
};

const EntryConfirmCard: VFC<Props> = ({ data }) => {
  const { user } = useAuth();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const entryDelete = async () => {
    await fuego.db
      .doc(`users/${user.uid}/entries/${data.id}`)
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
        onDelete={entryDelete}
      >
        <Text>
          {data.tournamentName}のエントリーを完全に削除してもよろしいですか？
        </Text>
      </DeleteDialog>
      <ConfirmCard onOpen={onOpen} data={data}>
        <Stack spacing={4}>
          <Flex wrap="wrap">
            {data.eventsInfo.map((event, idx) => (
              <HStack key={event.id} mr={6} mb={4}>
                <Box color="gray.500">
                  <Text>{`種目${idx + 1}`}</Text>
                  <Text>記録</Text>
                </Box>
                <Spacer />
                <Box fontWeight="bold">
                  <Text>{event.name}</Text>
                  <Text>{event.entryRecord}</Text>
                </Box>
              </HStack>
            ))}
          </Flex>
        </Stack>
      </ConfirmCard>
    </>
  );
};

export default EntryConfirmCard;
