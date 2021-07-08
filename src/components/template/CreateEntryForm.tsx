import { Box, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button, FormButton } from 'components/button';
import { DatePicker } from 'components/datepicker';
import { SuccessDialog } from 'components/dialog';
import { FormLabel } from 'components/form';
import { FormHeading } from 'components/heading';
import {
  EventCheckbox,
  FormControl,
  FormNumber,
  FormText,
} from 'components/input';
import { useAuth } from 'context/Auth';
import { CreateEntryFormInput, Tournament, UserInfo } from 'models/users';
import Router from 'next/router';
// import fetch from 'node-fetch';
import React, { VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FirebaseTimestamp } from 'utils/firebase';
// import { formatTimeLimitNotation } from 'utils/format';
import { eventOptions } from 'utils/selectOptions';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('大会名を入力してください。'),
  individualExpense: yup.number().required(),
  groupExpense: yup.number().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  timeLimit: yup.date().required(),
  events: yup.array().required('大会種目を1つ以上は選択してください。'),
});

const defaultValues: CreateEntryFormInput = {
  name: '',
  individualExpense: 1000,
  groupExpense: 500,
  startDate: new Date(),
  endDate: new Date(),
  timeLimit: new Date(),
  events: [],
};

const CreateEntryForm: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );

  // const { data: users } = useCollection<UserInfo>(`users`, {
  //   where: ['teamId', '==', userInfo.teamId],
  //   isCollectionGroup: true,
  // });

  const { add } = useCollection<Tournament>(
    `teams/${userInfo?.teamId}/tournaments`
  );

  const {
    errors,
    control,
    formState,
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateEntryFormInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { startDate, endDate } = watch(['startDate', 'endDate']);

  const { onOpen, isOpen } = useDisclosure();

  // // 部員全体に大会エントリー開始をメールで知らせる
  // const sendEmail = async (
  //   tournamentName: string,
  //   timeLimit: string,
  //   email: string
  // ) => {
  //   await fetch('/api/send', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: `${email}`,
  //       message: `${tournamentName}のエントリーが開始されました。期限【${timeLimit}】早めのエントリーにご協力ください。`,
  //     }),
  //   });
  // };

  // エントリーフォーム作成処理
  const createEntryForm = async (data: CreateEntryFormInput) => {
    const newEntryFormData: Tournament = {
      tournamentName: data.name,
      expense: {
        individual: data.individualExpense,
        group: data.groupExpense,
      },
      startDate: data.startDate,
      endDate: data.endDate,
      timeLimit: data.timeLimit,
      events: data.events,
      view: true,
      createdAt: FirebaseTimestamp.now(),
      updatedAt: FirebaseTimestamp.now(),
    };
    add(newEntryFormData).then(() => {
      onOpen();
      // users.map(async (user) => {
      // await sendEmail(
      //   data.name,
      //     formatTimeLimitNotation(data.timeLimit),
      //     user.email
      //     ).then(() => {
      //     });
      // });
    });
  };

  // 全ての大会種目にチェックをつける
  const allInput = () => {
    setValue('events', eventOptions);
  };

  return (
    <>
      <FormHeading title="エントリーフォーム作成" />
      <form onSubmit={handleSubmit(createEntryForm)}>
        {/* 大会名 */}
        <Stack spacing={8}>
          <FormText
            label="1. 大会名"
            name="name"
            control={control}
            errors={errors}
          />

          {/* 大会日程 */}
          <FormControl label="2. 大会日程">
            <Stack direction={['column', 'row']} spacing={4}>
              <Box>
                <Text ml={2}>開催日</Text>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ onChange, value }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      selectsStart
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )}
                />
              </Box>
              <Box>
                <Text ml={2}>終了日</Text>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ onChange, value }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      selectsStart
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )}
                />
              </Box>
            </Stack>
          </FormControl>

          {/* エントリー期限 */}
          <FormControl mt={12} label="3. エントリー期限">
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

          {/* エントリー費 */}
          <Stack>
            <FormLabel label="4. エントリー費" />
            <FormNumber
              label="個人種目"
              name="individualExpense"
              control={control}
              unit="円"
            />
            <FormNumber
              label="団体種目"
              name="groupExpense"
              control={control}
              unit="円"
            />
          </Stack>

          {/* エントリー種目 */}
          <Stack spacing={4}>
            <FormLabel label="5. エントリー種目" />
            <Button label="全ての種目を選択" onClick={allInput} />
            <EventCheckbox
              name="events"
              control={control}
              checkboxOptions={eventOptions}
            />
          </Stack>

          <FormButton
            label="作成"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          />
        </Stack>
      </form>
      <SuccessDialog
        title="エントリー作成成功"
        isOpen={isOpen}
        onClose={() => Router.push('/entry/management')}
        onClick={() => Router.push('/')}
      >
        エントリー作成が完了しました。
      </SuccessDialog>
    </>
  );
};

export default CreateEntryForm;
