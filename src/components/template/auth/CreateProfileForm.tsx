/* eslint-disable no-irregular-whitespace */
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
    name: string()
      .matches(/^[ぁ-んァ-ヶー一-龠( |　)]+$/, '全角文字で入力してください。')
      .required('氏名を入力してください。'),
    furigana: string()
      .matches(
        /^[あ-ん゛゜ぁ-ぉゃ-ょー「」、( |　)]+/,
        'ひらがなで入力してください。'
      )
      .required('ふりがなを入力してください。'),
  })
  .defined();

const defaultValues: Omit<UserInfoInForm, 'email' | 'grade'> = {
  name: '',
  furigana: '',
  gender: '男',
  role: '選手',
  block: '短距離',
};

const CreateProfileForm: VFC = () => {
  const { handleSubmit, control, errors, formState } = useForm<
    Omit<UserInfoInForm, 'email' | 'grade'>
  >({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();

  const onSubmit = (data: Omit<UserInfoInForm, 'email' | 'grade'>) => {
    // 入力した文字列は空白削除
    const profileData = {
      name: data.name.replace(/\s+/g, ''),
      furigana: data.furigana.replace(/\s+/g, ''),
      gender: data.gender,
      role: data.role,
      block: data.block,
    };
    createProfile(user?.uid, profileData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8} textAlign="left">
        <FormText
          label="氏名"
          name="name"
          placeholder="新潟太郎"
          errors={errors}
          control={control}
        />
        <FormText
          label="ふりがな"
          name="furigana"
          placeholder="にいがたたろう"
          errors={errors}
          control={control}
        />
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
