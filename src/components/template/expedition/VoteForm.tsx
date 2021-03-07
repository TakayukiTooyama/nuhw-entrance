import { HStack, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import { FormHeading } from 'components/heading';
import { FormRadio } from 'components/input';
import { Spinner } from 'components/loading';
import { useAuth } from 'context/Auth';
import { Expedition, User, Vote, VoteFormInput } from 'models/users';
import Router, { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { gradeOptions } from 'utils/selectOptions';

const defaultValues: VoteFormInput = {
  grade: '1年',
  rideInfo: '',
};

const VoteForm: VFC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const expeditionId: string = router.asPath.split('/expedition/')[1];

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  const { data: expedition } = useDocument<Expedition>(
    `teams/${userInfo?.teamId}/expeditions/${expeditionId}`,
    {
      parseDates: ['startDate'],
    }
  );

  const { add } = useCollection<Vote>(`users/${user?.uid}/votes`);

  const { handleSubmit, formState, control } = useForm<VoteFormInput>({
    defaultValues,
  });

  // バスの選択肢
  const busOptions = expedition?.busInfo?.map((data) => {
    return `${data.turn}便/${data.busNumber}号車/出発時間：${data.departureTime}`;
  });
  // 車の選択肢
  const carOptions = expedition?.carInfo?.map((data) => `${data.carName}の車`);
  // 乗車できるのは1つだけなので1つにまとめる
  const rideOptions = busOptions?.concat(carOptions);

  const addVote = (data: VoteFormInput) => {
    const trun = data.rideInfo.split('/')[0];
    const busNumber = data.rideInfo.split('/')[1];
    const selectedBusInfo = expedition?.busInfo?.filter(
      (data) =>
        `${data.turn}便/${data.busNumber}号車` === `${trun}/${busNumber}`
    );

    const carName = data.rideInfo;
    const selectedCarInfo = expedition?.carInfo?.filter(
      (data) => `${data.carName}の車` === `${carName}`
    );

    const newData: Vote = {
      name: userInfo.name,
      furigana: userInfo.furigana,
      gender: userInfo.gender,
      grade: data.grade,
      tournamentId: expedition.tournamentId,
      tournamentName: expedition.tournamentName,
      startDate: expedition.startDate,
      endDate: expedition.endDate,
      day: expedition.day,
      course: expedition.course,
      busInfo: selectedBusInfo[0] || '',
      carInfo: selectedCarInfo[0] || '',
    };
    add(newData).then(() => Router.push('/expedition'));
  };

  return (
    <>
      {expedition ? (
        <>
          <FormHeading title={expedition.tournamentName} pb={1} />
          <form onSubmit={handleSubmit(addVote)}>
            <Stack align="center" mb={8}>
              <HStack justify="center" fontWeight="bold">
                <Text>{expedition.day}日目</Text>
                <Text>/</Text>
                <Text>{expedition.course}</Text>
              </HStack>
            </Stack>
            <Stack spacing={8}>
              <FormRadio
                name="grade"
                label="1. 学年"
                radioOptions={gradeOptions}
                control={control}
              />

              <FormRadio
                name="rideInfo"
                label="2. 移動手段"
                radioOptions={rideOptions}
                control={control}
              />

              <FormButton
                label="送信"
                colorScheme="teal"
                isLoading={formState.isSubmitting}
              />
            </Stack>
          </form>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default VoteForm;
