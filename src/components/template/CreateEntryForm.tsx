import { Box, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import Router from 'next/router';
import type { VFC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, FormButton } from '@/components/button';
import { DatePicker } from '@/components/datepicker';
import { SuccessDialog } from '@/components/dialog';
import { FormLabel } from '@/components/form';
import { FormHeading } from '@/components/heading';
import { EventCheckbox, FormControl, FormText } from '@/components/input';
import { useAuth } from '@/context/Auth';
import type {
  CreateEntryFormInput,
  Tournament,
  UserInfo,
} from '@/models/users';
import { FirebaseTimestamp } from '@/utils/firebase';
import { eventOptions } from '@/utils/selectOptions';

const schema = yup.object().shape({
  name: yup.string().required('大会名を入力してください。'),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  timeLimit: yup.date().required(),
  events: yup.array().required('大会種目を1つ以上は選択してください。'),
});

const defaultValues: CreateEntryFormInput = {
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  timeLimit: new Date(),
  events: [],
};

export const CreateEntryForm: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );

  const { add } = useCollection<Tournament>(
    `teams/${userInfo?.teamId}/tournaments`
  );

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateEntryFormInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const watchField = watch(['startDate', 'endDate']);

  const { onOpen, isOpen } = useDisclosure();

  // エントリーフォーム作成処理
  const createEntryForm = async (data: CreateEntryFormInput) => {
    const newEntryFormData: Tournament = {
      tournamentName: data.name,
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
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      selectsStart
                      selectsEnd
                      startDate={watchField[0]}
                      endDate={watchField[1]}
                    />
                  )}
                />
              </Box>
              <Box>
                <Text ml={2}>終了日</Text>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      selectsStart
                      selectsEnd
                      startDate={watchField[0]}
                      endDate={watchField[1]}
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
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  showTimeSelect
                />
              )}
            />
          </FormControl>

          {/* エントリー種目 */}
          <Stack spacing={4}>
            <FormLabel label="4. エントリー種目" />
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
            isLoading={isSubmitting}
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
