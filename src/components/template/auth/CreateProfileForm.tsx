/* eslint-disable no-irregular-whitespace */
import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { FormRadio, FormText } from 'components/input';
import { useAuth } from 'context/Auth';
import { User, UserInfoInForm } from 'models/users';
import Router from 'next/router';
import React, { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { blockOptions, genderOptions, roleOptions } from 'utils/selectOptions';
import { object, SchemaOf, string } from 'yup';

type CreateProfileInput = Omit<UserInfoInForm, 'email' | 'grade'>;

const schema: SchemaOf<CreateProfileInput> = object()
  .shape({
    name: string()
      .matches(/^[ぁ-んァ-ンヴー-龥(\s|　)]+$/, '全角で入力してください。')
      .required('氏名を入力してください。'),
    furigana: string()
      .matches(/^[ァ-ンヴー(\s|　)]+$/, '全角カタカナで入力してください。')
      .required('フリガナを入力してください。'),
  })
  .defined();

const defaultValues: CreateProfileInput = {
  name: '',
  furigana: '',
  gender: '男',
  role: '選手',
  block: '短距離',
};

const CreateProfileForm: VFC = () => {
  const { getValues, control, errors, formState } = useForm<CreateProfileInput>(
    {
      defaultValues,
      resolver: yupResolver(schema),
    }
  );
  const { user } = useAuth();
  const { set } = useDocument<User>(`users/${user?.uid}`);

  const onSubmit = () => {
    const values = getValues();
    // 入力した文字列は空白削除
    const profileData: CreateProfileInput = {
      name: values.name.replace(/\s+/g, ''),
      furigana: values.furigana.replace(/\s+/g, ''),
      gender: values.gender,
      role: values.role,
      block: values.block,
    };
    set(profileData, { merge: true }).then(() => {
      Router.push('/team/join');
    });
  };

  return (
    <form>
      <Stack spacing={6}>
        <FormText
          label="氏名"
          name="name"
          placeholder="新潟太郎"
          errors={errors}
          control={control}
        />
        <FormText
          label="フリガナ"
          name="furigana"
          placeholder="ニイガタタロウ"
          errors={errors}
          control={control}
        />
        <FormRadio
          label="性別"
          name="gender"
          colorScheme="orange"
          radioOptions={genderOptions}
          control={control}
        />
        <FormRadio
          label="役割"
          name="role"
          colorScheme="orange"
          radioOptions={roleOptions}
          control={control}
        />
        <FormRadio
          label="所属ブロック"
          name="block"
          colorScheme="orange"
          radioOptions={blockOptions}
          control={control}
        />
        <Button
          label="作成"
          color="white"
          bg="orange.400"
          onClick={onSubmit}
          isLoading={formState.isSubmitting}
        />
      </Stack>
    </form>
  );
};

export default CreateProfileForm;
