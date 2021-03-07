import { Box, Stack, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button, FormButton } from 'components/button';
import { DatePicker } from 'components/datepicker';
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
import React, { VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FirebaseTimestamp } from 'utils/firebase';
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
      createdAt: FirebaseTimestamp.now(),
      updatedAt: FirebaseTimestamp.now(),
    };
    add(newEntryFormData).then(() => Router.push('/entry/management'));
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
    </>
  );
};

export default CreateEntryForm;
