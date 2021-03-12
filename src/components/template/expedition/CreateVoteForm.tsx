import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, HStack, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
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
import { AiOutlineFieldTime } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaBusAlt, FaCarSide } from 'react-icons/fa';
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
    setIsBusInfoEdit(false);
    setTurn('1');
    setBusNumber(`${busInfo.length + 2}`);
    setCapacity('');
  };
  const addCarInfo = () => {
    const newCarInfo = {
      carName,
    };
    setCarInfo((prev) => [...prev, newCarInfo]);
    setIsCarInfoEdit(false);
    setCarName('');
  };

  const deleteBusInfo = (turn: string, busNumber: string) => {
    const newBusInfo = busInfo.filter(
      (data) => `${data.turn}${data.busNumber}` !== `${turn}${busNumber}`
    );
    setBusInfo(newBusInfo);
    setBusNumber(`${busInfo.length}`);
  };
  const deleteCarInfo = (name: string) => {
    const newCarInfo = carInfo.filter((data) => data.carName !== name);
    setCarInfo(newCarInfo);
  };

  return (
    <>
      <FormHeading title="希望投票作成" />
      <form onSubmit={handleSubmit(addVote)}>
        <Stack spacing={8}>
          <FormSelect
            placeholder="大会を選択してください"
            name="name"
            label="1. 大会名"
            selectOptions={filteredTournament?.map(
              (data) => data.tournamentName
            )}
            control={control}
          />
          <HStack>
            <FormPinNumber
              label="2. 大会何日目"
              name="day"
              control={control}
              unit="日目"
            />
          </HStack>

          <FormRadio
            label="3. コース"
            name="course"
            colorScheme="teal"
            radioOptions={courseOptions}
            control={control}
          />

          <Stack spacing={4}>
            <FormLabel label="4. バス" />
            {busInfo &&
              busInfo.map((data) => (
                <Card
                  key={`${data.turn}/${data.busNumber}`}
                  bgGradient="linear(to-l, #dfe9f3, white)"
                  fontWeight="bold"
                  fontSize="18px"
                  innerPadding={6}
                >
                  <Flex justify="space-between" align="center">
                    <HStack spacing={4}>
                      <Icon as={FaBusAlt} />
                      <Text>{data.turn}便</Text>
                      <Text>{data.busNumber}号車</Text>
                    </HStack>
                    <IconButton
                      bg="red.300"
                      aria-label="deleteIcon"
                      size="sm"
                      shadow="inner"
                      icon={<DeleteIcon />}
                      onClick={() => deleteBusInfo(data.turn, data.busNumber)}
                    />
                  </Flex>
                  <HStack>
                    <Icon as={AiOutlineFieldTime} w={6} h={6} />
                    <Text>出発時間 ⇨ {data.departureTime}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={BsFillPersonFill} w={6} h={6} />
                    <Text>定員{data.capacity}人</Text>
                  </HStack>
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
            <FormLabel label="5. 車" />
            {carInfo &&
              carInfo.map((data) => (
                <Card
                  key={data.carName}
                  bgGradient="linear(to-l, #dfe9f3, white)"
                  fontWeight="bold"
                  fontSize="18px"
                  innerPadding={6}
                >
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Icon as={FaCarSide} w={6} h={6} />
                      <Text>{data.carName}の車</Text>
                    </HStack>
                    <IconButton
                      bg="red.300"
                      aria-label="deleteIcon"
                      size="sm"
                      shadow="inner"
                      icon={<DeleteIcon />}
                      onClick={() => deleteCarInfo(data.carName)}
                    />
                  </Flex>
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

          <FormControl mt={12} label="6. 投票期限">
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
