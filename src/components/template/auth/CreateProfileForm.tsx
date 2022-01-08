/* eslint-disable no-irregular-whitespace */
import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDocument } from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import { FormRadio, FormText } from 'components/input';
import { useAuth } from 'context/Auth';
import { User, UserInfoInForm } from 'models/users';
import Router from 'next/router';
import React, { VFC } from 'react';
import { useForm } from 'react-hook-form';
import {
  blockOptions,
  genderOptions,
  gradeOptions,
  roleOptions,
} from 'utils/selectOptions';
import { mixed, object, SchemaOf, string } from 'yup';

type CreateProfileInput = Omit<UserInfoInForm, 'email'>;

const schema: SchemaOf<CreateProfileInput> = object().shape({
  grade: mixed()
    .oneOf(['1年', '2年', '3年', '4年', '院1', '院2', 'コーチ'])
    .required('必須項目です。'),
  gender: mixed().oneOf(['男', '女']).required('必須項目です。'),
  role: mixed()
    .oneOf(['選手', '管理者', 'マネージャー', 'トレーナー', 'コーチ'])
    .required('必須項目です。'),
  block: mixed()
    .oneOf([
      '短距離',
      '長距離',
      '投擲',
      '跳躍',
      'マネージャー',
      'トレーナー',
      'コーチ',
    ])
    .required('必須項目です。'),
  name: string()
    .matches(/^[ぁ-んァ-ンヴー-龥々ヵヶ(\s|　)]+$/, '全角で入力してください。')
    .required('氏名を入力してください。'),
  furigana: string()
    .matches(/^[ァ-ンヴー(\s|　)]+$/, '全角カタカナで入力してください。')
    .required('フリガナを入力してください。'),
});

const defaultValues: CreateProfileInput = {
  grade: '1年',
  gender: '男',
  role: '選手',
  block: '短距離',
  name: '',
  furigana: '',
};

const CreateProfileForm: VFC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProfileInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();
  const { set } = useDocument<User>(`users/${user?.uid}`);

  const onSubmit = (data: CreateProfileInput) => {
    // 入力した文字列は空白削除
    const profileData: CreateProfileInput = {
      grade: data.grade,
      gender: data.gender,
      role: data.role,
      block: data.block,
      name: data.name.replace(/\s+/g, ''),
      furigana: data.furigana.replace(/\s+/g, ''),
    };
    set(profileData, { merge: true }).then(() => {
      Router.push('/team/join');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormRadio
          label="学年"
          name="grade"
          colorScheme="orange"
          radioOptions={gradeOptions}
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
        <FormButton
          label="作成"
          color="white"
          bg="orange.400"
          isLoading={isSubmitting}
        />
      </Stack>
    </form>
  );
};

export default CreateProfileForm;
