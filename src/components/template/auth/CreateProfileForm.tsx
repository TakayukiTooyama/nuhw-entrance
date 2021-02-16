import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormButton } from 'components/button';
import { FormRadio, FormText } from 'components/input';
import { useAuth } from 'context/Auth';
import { UserInfoInForm } from 'models/users';
import React, { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { createProfile } from 'utils/firestore/users';
import { blockOptions, genderOptions, roleOptions } from 'utils/selectOptions';
import { object, SchemaOf, string } from 'yup';

const schema: SchemaOf<UserInfoInForm> = object()
  .shape({
    name: string().default('').required('氏名を入力してください。'),
  })
  .defined();

const defaultValues: Omit<UserInfoInForm, 'grade'> = {
  name: '',
  gender: '男',
  role: '選手',
  block: '短距離',
};

const CreateProfileForm: VFC = () => {
  const { handleSubmit, control, errors, formState } = useForm<
    Omit<UserInfoInForm, 'grade'>
  >({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();

  const onSubmit = (data: Omit<UserInfoInForm, 'grade'>) => {
    const profileData = {
      name: data.name,
      gender: data.gender,
      role: data.role,
      block: data.block,
    };
    createProfile(user.uid, profileData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8} textAlign="left">
        <FormText label="氏名" name="name" errors={errors} control={control} />
        <FormRadio
          label="性別"
          name="gender"
          radioOptions={genderOptions}
          control={control}
        />
        <FormRadio
          label="役割"
          name="role"
          radioOptions={roleOptions}
          control={control}
        />
        <FormRadio
          label="所属ブロック"
          name="block"
          radioOptions={blockOptions}
          control={control}
        />
        <FormButton
          label="作成"
          color="white"
          bg="orange.400"
          isLoading={formState.isSubmitting}
        />
      </Stack>
    </form>
  );
};

export default CreateProfileForm;
