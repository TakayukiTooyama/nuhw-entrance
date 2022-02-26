import {
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import type { VFC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormButton } from '@/components/button';
import { Card } from '@/components/card';
import { SuccessDialog } from '@/components/dialog';
import { FormLabel } from '@/components/form';
import { FormHeading } from '@/components/heading';
import { EventCheckbox, FormControl, InputNumber } from '@/components/input';
import { useAuth } from '@/context/Auth';
import type {
  Entry,
  EntryFormInput,
  EventInfo,
  Tournament,
  UserInfo,
} from '@/models/users';
import { FirebaseTimestamp } from '@/utils/firebase';

const defaultValues: EntryFormInput = {
  events: [],
};

const inputStyle = {
  w: '100%',
  h: '40px',
  lineHeight: '38px',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: '5px',
  bg: 'white',
};

export const EntryForm: VFC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const tournamentId: string = router.asPath.split('/entry/')[1];

  const { data: userInfo } = useDocument<UserInfo>(`users/${user?.uid}`);
  const { data: tournamentInfo } = useDocument<Tournament>(
    `/teams/${userInfo?.teamId}/tournaments/${tournamentId}`,
    {
      parseDates: ['startDate', 'endDate', 'timeLimit'],
    }
  );
  const { add: EntryAdd } = useCollection<Omit<Entry, 'timeLimit'>>(
    `users/${user?.uid}/entries`,
    {
      listen: true,
    }
  );

  const { handleSubmit, watch, formState, control } = useForm<EntryFormInput>({
    defaultValues,
  });
  const watctEvents = watch('events');

  const [entryRecord, setEntryRecord] = useState('');
  const [eventsInfo, setEventsInfo] = useState<EventInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { onOpen, isOpen } = useDisclosure();

  const updateEntryRecord = (index: number) => {
    const selectedIndex = eventsInfo.findIndex((event) => event.id === index);
    const newEventsInfo = eventsInfo;
    newEventsInfo[selectedIndex] = {
      ...eventsInfo[selectedIndex],
      entryRecord,
    };
    setEventsInfo(newEventsInfo);
    setIsEdit(false);
  };

  const keyPressUpdateEntryRecord = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      updateEntryRecord(index);
    }
  };

  const addEntry = (data: EntryFormInput) => {
    const hasExistsEntryRecord = eventsInfo.some(
      (event) => !event.entryRecord || event.entryRecord === ''
    );
    if (hasExistsEntryRecord) {
      setErrorMessage('自己ベストが入力されていません。');
      return;
    }
    if (!data.events.length) {
      setErrorMessage('種目が選択されていません。');
      return;
    }

    const newEventsInfo: EventInfo[] = [];
    eventsInfo.forEach((event) => {
      data.events.forEach((name) => {
        if (event.name === name) {
          if (event.name === '4×400リレー' || event.name === '4×100リレー') {
            newEventsInfo.push({
              ...event,
              expense: tournamentInfo.expense.group,
            });
          } else {
            newEventsInfo.push({
              ...event,
              expense: tournamentInfo.expense.individual,
            });
          }
        }
      });
    });

    const newEntryData: Omit<Entry, 'timeLimit'> = {
      name: userInfo.name,
      furigana: userInfo.furigana,
      gender: userInfo.gender,
      grade: userInfo.grade ?? '1年',
      tournamentId: tournamentInfo.id,
      tournamentName: tournamentInfo.tournamentName,
      startDate: tournamentInfo.startDate,
      endDate: tournamentInfo.endDate,
      eventsInfo: newEventsInfo,
      addedAt: FirebaseTimestamp.now(),
    };

    EntryAdd(newEntryData).then(() => {
      onOpen();
    });
  };

  // 編集への切り替え(Recordクリック時の処理)
  const handleClick = (id: number, value: string) => {
    setEntryRecord(value);
    setSelectedIndex(id);
    setIsEdit(true);
  };

  useEffect(() => {
    setErrorMessage('');
  }, [entryRecord, watctEvents]);

  return (
    <>
      <FormHeading title="エントリーフォーム" />
      <form onSubmit={handleSubmit(addEntry)}>
        <Stack spacing={8}>
          <FormControl label="1. エントリー種目">
            <EventCheckbox
              name="events"
              control={control}
              checkboxOptions={tournamentInfo?.events}
              setEvents={setEventsInfo}
            />
          </FormControl>

          <Stack>
            <FormLabel label="2. 参加記録" />
            <Card bg="gray.50" innerPadding={4}>
              {eventsInfo?.length > 0 ? (
                <SimpleGrid columns={[1, 2]} columnGap={4} rowGap={6}>
                  {eventsInfo.map((item) => (
                    <Box key={item.id}>
                      <Text mb={1} fontWeight="bold">
                        {item.name}
                      </Text>
                      <HStack>
                        <Text minW="36px">記録</Text>
                        <Box w="100%">
                          {isEdit && selectedIndex === item.id ? (
                            <InputNumber
                              w="100%"
                              bg="white"
                              value={entryRecord}
                              setValue={setEntryRecord}
                              inputMode="decimal"
                              step={0.01}
                              onBlur={() => updateEntryRecord(item.id)}
                              onKeyDown={(e) =>
                                keyPressUpdateEntryRecord(e, item.id)
                              }
                            />
                          ) : (
                            <Box
                              px={4}
                              bg="white"
                              onClick={() =>
                                handleClick(item.id, item.entryRecord)
                              }
                              {...inputStyle}
                            >
                              {item.entryRecord}
                            </Box>
                          )}
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>選択された種目がまだありません。</Text>
              )}
            </Card>
          </Stack>

          <Stack align="center">
            <FormButton
              label="送信"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
            />
            <Text color="red.300" fontWeight="bold">
              {errorMessage}
            </Text>
          </Stack>
        </Stack>
      </form>
      <SuccessDialog
        title="エントリー完了！"
        isOpen={isOpen}
        onClose={() => router.push('/')}
        onClick={() => router.push('/entry/confirm')}
      />
    </>
  );
};
