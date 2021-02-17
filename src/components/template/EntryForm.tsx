import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import { Card } from 'components/card';
import { FormLabel } from 'components/form';
import { FormHeading } from 'components/heading';
import { EventCheckbox, FormControl, FormRadio } from 'components/input';
import { useAuth } from 'context/Auth';
import {
  Entry,
  EntryFormInput,
  EventInfo,
  Tournament,
  UserInfo,
} from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { FirebaseTimestamp } from 'utils/firebase';
import { gradeOptions } from 'utils/selectOptions';

const inputStyle = {
  w: '100%',
  h: '40px',
  maxW: '145px',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: '5px',
  bg: 'white',
  m: 0,
};

const defaultValues: EntryFormInput = {
  grade: '1年',
  events: [],
};

const EntryFormDetail: VFC = () => {
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
  const { add } = useCollection<Omit<Entry, 'timeLimit'>>(
    `users/${user?.uid}/entries`
  );

  const { handleSubmit, formState, control } = useForm<EntryFormInput>({
    defaultValues,
  });

  const [entryRecord, setEntryRecord] = useState('');
  const [eventsInfo, setEventsInfo] = useState<EventInfo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntryRecord(e.target.value);
  };

  const updateEntryRecord = (index: number) => {
    const selectedIndex = eventsInfo.findIndex((event) => event.id === index);
    const newEventsInfo = eventsInfo;
    newEventsInfo[selectedIndex] = {
      ...eventsInfo[selectedIndex],
      entryRecord,
    };
    setEventsInfo(newEventsInfo);
  };

  const keyPressUpdateEntryRecord = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      updateEntryRecord(index);
    }
  };

  const addEntry = (data: EntryFormInput) => {
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

    const expenseArray = newEventsInfo.map((data) => data.expense);
    const totalExpenses = expenseArray.reduce((acc, cur) => acc + cur);

    const newData: Omit<Entry, 'timeLimit'> = {
      name: userInfo.name,
      furigana: userInfo.furigana,
      gender: userInfo.gender,
      grade: data.grade,
      tournamentId: tournamentInfo.id,
      tournamentName: tournamentInfo.tournamentName,
      startDate: tournamentInfo.startDate,
      endDate: tournamentInfo.endDate,
      eventsInfo: newEventsInfo,
      expense: tournamentInfo.expense,
      totalExpenses,
      isPayment: false,
      addedAt: FirebaseTimestamp.now(),
    };
    add(newData).then(() => Router.push('/'));
  };

  return (
    <>
      <FormHeading title="エントリーフォーム" />
      <form onSubmit={handleSubmit(addEntry)}>
        <Stack spacing={12}>
          <FormRadio
            name="grade"
            label="①学年"
            radioOptions={gradeOptions}
            control={control}
          />

          <FormControl label="②エントリー種目">
            <EventCheckbox
              name="events"
              control={control}
              checkboxOptions={tournamentInfo?.events}
              setEvents={setEventsInfo}
            />
          </FormControl>

          <Stack>
            <FormLabel label="③自己ベスト" />
            {eventsInfo?.length ? (
              eventsInfo.map((item) => (
                <Card key={item.id} bg="gray.50">
                  <Text mb={2}>{item.name}</Text>
                  <HStack spacing={4}>
                    <Text w="36px">記録</Text>
                    <Editable w="100%" m={0}>
                      <EditablePreview
                        px={2}
                        lineHeight="32px"
                        {...inputStyle}
                        display="inline-block"
                      />
                      <EditableInput
                        px={2}
                        onChange={handleChange}
                        onBlur={() => updateEntryRecord(item.id)}
                        onKeyDown={(e) => keyPressUpdateEntryRecord(e, item.id)}
                        {...inputStyle}
                      />
                    </Editable>
                  </HStack>
                </Card>
              ))
            ) : (
              <Text>選択された種目がまだありません。</Text>
            )}
          </Stack>

          <FormButton
            label="送信"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          />
        </Stack>
      </form>
    </>
  );
};

export default EntryFormDetail;
