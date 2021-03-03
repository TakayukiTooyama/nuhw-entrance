import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { Card } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { CardTextSchedule } from 'components/text';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import React, { useRef, VFC } from 'react';
import { formatFullNotation, formatWeekdayNotation } from 'utils/format';

type Props = BoxProps & {
  data: Document<Entry>;
};

const ConfirmCard: VFC<Props> = ({ data, ...props }) => {
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
      <Card innerPadding={4} {...props}>
        <Stack>
          <Flex alignItems="center" justify="space-between">
            <Heading as="h2" size="lg" isTruncated>
              {data.tournamentName}
            </Heading>
            <IconButton
              aria-label="deleteIcon"
              size="sm"
              bg="red.300"
              shadow="inner"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
          </Flex>
          <Divider colorScheme="red" />
          <CardTextSchedule
            color="gray.400"
            startDate={formatFullNotation(data.startDate)}
            endDate={formatWeekdayNotation(data.endDate)}
          />
        </Stack>
        <Box mb={6} />
        <Stack spacing={4}>
          <HStack>
            <Text spacing={4}>学年</Text>
            <Text>{data.grade}</Text>
          </HStack>
          <Flex wrap="wrap">
            {data.eventsInfo.map((event, idx) => (
              <HStack key={event.id} mr={6} mb={4}>
                <Box>
                  <Text>{`種目${idx + 1}`}</Text>
                  <Text>記録</Text>
                </Box>
                <Spacer />
                <Box>
                  <Text>{event.name}</Text>
                  <Text>{event.entryRecord}</Text>
                </Box>
              </HStack>
            ))}
          </Flex>
        </Stack>
      </Card>
    </>
  );
};

export default ConfirmCard;
