import { HStack, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button, FormButton } from 'components/button';
import { Card } from 'components/card';
import { DatePicker } from 'components/datepicker';
import { FormLabel } from 'components/form';
import { FormHeading } from 'components/heading';
import {
  FormControl,
  FormPinNumber,
  FormRadio,
  FormSelect,
} from 'components/input';
import { CreateBusInfo, CreateCarInfo } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import {
  BusInfo,
  CarInfo,
  CreateVoteFormInput,
  Expedition,
  Tournament,
  UserInfo,
} from 'models/users';
import Router from 'next/router';
import React, { useState, VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formatTimeNotation } from 'utils/format';
import { courseOptions } from 'utils/selectOptions';

const defaultValues: CreateVoteFormInput = {
  name: '',
  day: '1',
  course: '行き',
  timeLimit: new Date(),
};

const CreateVoteForm: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(`users/${user?.uid}`);
  const { data: tournaments } = useCollection<Tournament>(
    `teams/${userInfo?.teamId}/tournaments`,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate'],
    }
  );
  const { add } = useCollection<Expedition>(
    `teams/${userInfo?.teamId}/expeditions`
  );

  // 期限内の大会
  const filteredTournament = tournaments?.filter(
    (data) => data.endDate > new Date()
  );

  const { handleSubmit, formState, control } = useForm<CreateVoteFormInput>({
    defaultValues,
  });

  // 何便
  const [turn, setTurn] = useState('1');
  // 何号車
  const [busNumber, setBusNumber] = useState('1');
  // 出発時間
  const [departureTime, setDepartureTime] = useState(new Date());
  // 定員
  const [capacity, setCapacity] = useState('');
  // 車の名前(誰の車で行くのか)
  const [carName, setCarName] = useState('');

  const [busInfo, setBusInfo] = useState<BusInfo[]>([]);
  const [carInfo, setCarInfo] = useState<CarInfo[]>([]);
  const [index, setIndex] = useState(0);

  // バス情報の編集切り替え
  const [isBusInfoEdit, setIsBusInfoEdit] = useState(false);
  // 車情報の編集切り替え
  const [isCarInfoEdit, setIsCarInfoEdit] = useState(false);

  const addVote = (data: CreateVoteFormInput) => {
    const selectTournament = filteredTournament?.filter(
      (tournament) => tournament.tournamentName === data.name
    );
    const newVote: Expedition = {
      tournamentId: selectTournament[0].id,
      tournamentName: data.name,
      startDate: selectTournament[0].startDate,
      endDate: selectTournament[0].endDate,
      day: data.day,
      course: data.course,
      busInfo: busInfo,
      carInfo: carInfo,
      timeLimit: data.timeLimit,
    };
    add(newVote).then(() => {
      Router.push('/expedition/management');
    });
  };

  const addBusInfo = () => {
    const formatDepartureTime = formatTimeNotation(departureTime);
    const newBusInfo: BusInfo = {
      turn,
      busNumber,
      departureTime: formatDepartureTime,
      capacity,
    };
    setBusInfo((prev) => [...prev, newBusInfo]);
    setIndex((prev) => prev + 1);
    setIsBusInfoEdit(false);
    setTurn('1');
    setBusNumber('2');
    setCapacity('');
  };
  const addCarInfo = () => {
    const newCarInfo = {
      id: index,
      carName,
    };
    setCarInfo((prev) => [...prev, newCarInfo]);
    setIsCarInfoEdit(false);
    setCarName('');
  };

  return (
    <>
      <FormHeading title="希望投票作成" />
      <form onSubmit={handleSubmit(addVote)}>
        <Stack spacing={12}>
          <FormSelect
            placeholder="大会を選択してください"
            name="name"
            label="大会名"
            selectOptions={filteredTournament?.map(
              (data) => data.tournamentName
            )}
            control={control}
          />
          <HStack>
            <FormPinNumber
              label="②大会何日目"
              name="day"
              control={control}
              unit="日目"
            />
          </HStack>

          <FormRadio
            label="③コース"
            name="course"
            radioOptions={courseOptions}
            control={control}
          />

          <Stack spacing={4}>
            <FormLabel label="④バス" />
            {busInfo &&
              busInfo.map((data) => (
                <Card key={`${data.turn}/${data.busNumber}`}>
                  <HStack>
                    <Text>{data.turn}便</Text>
                    <Text>{data.busNumber}号車</Text>
                    <Text>定員{data.capacity}人</Text>
                  </HStack>
                  <Text>
                    出発時間：
                    {data.departureTime}
                  </Text>
                </Card>
              ))}
            {isBusInfoEdit ? (
              <>
                <CreateBusInfo
                  turn={turn}
                  busNumber={busNumber}
                  departureTime={departureTime}
                  capacity={capacity}
                  setTurn={setTurn}
                  setBusNumber={setBusNumber}
                  setDepartureTime={setDepartureTime}
                  setCapacity={setCapacity}
                />
                <Button label="追加" onClick={addBusInfo} />
              </>
            ) : (
              <Button label="＋" onClick={() => setIsBusInfoEdit(true)} />
            )}
          </Stack>

          <Stack spacing={4}>
            <FormLabel label="⑤車" />
            {carInfo &&
              carInfo.map((data) => (
                <Card key={data.carName}>
                  <Text>{data.carName}の車</Text>
                </Card>
              ))}
            {isCarInfoEdit ? (
              <>
                <CreateCarInfo carName={carName} setCarName={setCarName} />
                <Button label="追加" onClick={addCarInfo} />
              </>
            ) : (
              <Button label="＋" onClick={() => setIsCarInfoEdit(true)} />
            )}
          </Stack>

          <FormControl mt={12} label="⑥投票期限">
            <Controller
              control={control}
              name="timeLimit"
              render={({ onChange, value }) => (
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  showTimeSelect
                />
              )}
            />
          </FormControl>

          <FormButton
            label="作成"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          />
        </Stack>
      </form>
    </>
  );
};

export default CreateVoteForm;
