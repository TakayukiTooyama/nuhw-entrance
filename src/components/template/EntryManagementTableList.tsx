/* eslint-disable no-sparse-arrays */
import { Box, Heading, Select, Stack, useToast } from '@chakra-ui/react';
import { Document, useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { EntryManagementTable } from 'components/template';
import { EntryCountTable } from 'components/template/entry';
import { useAuth } from 'context/Auth';
import { Entry, Event, Tournament, UserInfo } from 'models/users';
import React, { useState, VFC } from 'react';
import { eventOptions } from 'utils/selectOptions';

type Props = {
  entries: Document<Omit<Entry, 'timeLimit'>>[];
  tournamentId: string | string[];
};

type TestData = {
  name: string;
  romaji: string;
  furigana: string;
  gender: '男' | '女';
  rikukyo: string;
  birthday: string;
  tournamentData: {
    type: string;
    record: string;
    tournamentName: string;
    date: string;
  }[];
};

const EntryManagementTableList: VFC<Props> = ({ entries, tournamentId }) => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );
  const { update, data: tournaments } = useDocument<Tournament>(
    userInfo ? `teams/${userInfo.teamId}/tournaments/${tournamentId}` : null,
    {
      listen: true,
    }
  );

  const { data: testData } = useCollection<TestData>(
    `teams/Vwn4SWU3FsqSbqIU7mKy/test`,
    { orderBy: ['gender', 'desc'] }
  );

  const toast = useToast();

  const [isEdit, setIsEdit] = useState(false);
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState(false);

  const maleEntryData = entries.filter((data) => data.gender === '男');
  const femaleEntryData = entries.filter((data) => data.gender === '女');
  const maleData = testData?.filter((data) => data.gender === '男');
  const femaleData = testData?.filter((data) => data.gender === '女');

  const tables = [
    { gender: '男子', entries: maleEntryData },
    { gender: '女子', entries: femaleEntryData },
  ];

  const eventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value as Event;
    setEvent(event);
  };

  const addEvent = () => {
    const currentEvents = tournaments.events;
    update({ events: [...currentEvents, event] }).then(() => {
      toast({
        title: '種目追加完了',
        description: '正常に種目が追加されました。',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    });
  };

  const deleteEvent = () => {
    const currentEvents = tournaments.events;
    const newEvents = currentEvents.filter(
      (currentEvent) => currentEvent !== event
    );
    update({ events: newEvents }).then(() => {
      toast({
        title: '種目削除完了',
        description: '正常に種目が削除されました。',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    });
  };

  const appendSpreadsheet = async () => {
    setLoading(true);

    try {
      const manTableAppendData = maleData.flatMap((data, idx) => {
        return data.tournamentData.flatMap((tournament, id) => {
          return [
            [
              idx + id + 1,
              '',
              data.furigana,
              data.romaji,
              tournament.type,
              tournament.record,
              data.rikukyo,
              '',
            ],
            [, '', data.name, , '', tournament.date, , data.birthday],
          ];
        });
      });

      const womanTableAppendData = femaleData.flatMap((data, idx) => {
        return data.tournamentData.flatMap((tournament, id) => {
          return [
            [
              idx + id + 1,
              '',
              data.furigana,
              data.romaji,
              tournament.type,
              tournament.record,
              data.rikukyo,
              '',
            ],
            [, '', data.name, , '', tournament.date, , data.birthday],
          ];
        });
      });
      const evidenceAppendData = testData?.flatMap((data, idx) => {
        return data.tournamentData.flatMap((tournament, id) => {
          return [
            [
              idx + id + 1,
              data.gender,
              data.name,
              tournament.type,
              tournament.record,
              tournament.date,
              tournament.tournamentName,
              '',
            ],
          ];
        });
      });

      const manTableResponse = await fetch(
        'https://v1.nocodeapi.com/sphacks/google_sheets/rWCufIptQSvrrKkj?tabId=男子申し込み用紙',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(manTableAppendData),
        }
      );
      const wonmanTableResponse = await fetch(
        'https://v1.nocodeapi.com/sphacks/google_sheets/rWCufIptQSvrrKkj?tabId=女子申し込み用紙',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(womanTableAppendData),
        }
      );
      const evidenceResponse = await fetch(
        'https://v1.nocodeapi.com/sphacks/google_sheets/rWCufIptQSvrrKkj?tabId=参加標準記録証明文書',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(evidenceAppendData),
        }
      );
      await manTableResponse.json().then(async () => {
        await wonmanTableResponse.json().then(async () => {
          await evidenceResponse.json().then(() => {
            toast({
              title: '書き込み成功',
              description: 'スプレッドシートにデータが書き込まれました。',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setLoading(false);
          });
        });
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Stack spacing={12}>
      <Heading>{entries[0]?.tournamentName}</Heading>
      <Box>
        <EntryCountTable
          maleCount={maleEntryData.length}
          femaleCount={femaleEntryData.length}
        />
      </Box>
      {tables.map((data) => (
        <EntryManagementTable
          key={data.gender}
          entries={data.entries}
          gender={data.gender}
        />
      ))}
      {isEdit ? (
        <Stack direction={['column', 'row']} spacing={8}>
          <Stack w="100%" spacing={4}>
            <Select
              placeholder="種目"
              bg="white"
              size="lg"
              onChange={eventChange}
            >
              {eventOptions
                .filter((event) => tournaments.events.indexOf(event) == -1)
                .map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
            </Select>
            <Button label="追加" colorScheme="teal" onClick={addEvent} />
          </Stack>
          <Stack w="100%" spacing={4}>
            <Select
              placeholder="種目"
              bg="white"
              size="lg"
              onChange={eventChange}
            >
              {eventOptions
                .filter((event) => tournaments.events.indexOf(event) != -1)
                .map((event) => (
                  <option key={event} value={event}>
                    {event}
                  </option>
                ))}
            </Select>
            <Button label="削除" colorScheme="red" onClick={deleteEvent} />
          </Stack>
        </Stack>
      ) : (
        <Button
          label="エントリー種目を編集"
          colorScheme="teal"
          onClick={() => setIsEdit(true)}
        />
      )}
      <Button
        label="県選申し込み作成"
        onClick={appendSpreadsheet}
        isLoading={loading}
      />
    </Stack>
  );
};

export default EntryManagementTableList;
