/* eslint-disable no-irregular-whitespace */
import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDocument } from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import { FormRadio, FormText } from 'components/input';
import { useAuth } from 'context/Auth';
import { User, UserInfo, UserInfoInForm } from 'models/users';
import React, { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { blockOptions, genderOptions, gradeOptions } from 'utils/selectOptions';
import { mixed, object, SchemaOf, string } from 'yup';

type ProfileInput = Omit<UserInfoInForm, 'email' | 'role'>;
const schema: SchemaOf<ProfileInput> = object().shape({
  grade: mixed()
    .oneOf(['1年', '2年', '3年', '4年', '院1', '院2', 'コーチ'])
    .required('必須項目です。'),
  gender: mixed().oneOf(['男', '女']).required('必須項目です。'),
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

type Props = {
  userInfo: UserInfo;
};

const ProfileChangeForm: VFC<Props> = ({ userInfo }) => {
  const defaultValues: ProfileInput = {
    name: userInfo.name,
    furigana: userInfo.furigana,
    grade: userInfo.grade,
    gender: userInfo.gender,
    block: userInfo.block,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInput>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { user } = useAuth();
  const { update } = useDocument<User>(`users/${user?.uid}`);
  const [state, setState] = useState<'default' | 'edit' | 'loading' | 'save'>(
    'default'
  );

  const saveProfile = (inputData: ProfileInput) => {
    setState('loading');
    const profileData: ProfileInput = {
      name: inputData.name.replace(/\s+/g, ''),
      furigana: inputData.furigana.replace(/\s+/g, ''),
      grade: inputData.grade,
      gender: inputData.gender,
      block: inputData.block,
    };
    update(profileData).then(() => {
      setState('save');
    });
  };

  return (
    <form onSubmit={handleSubmit(saveProfile)}>
      <Stack spacing={6} mb={8} onClick={() => setState('edit')}>
        <FormRadio
          label="学年"
          name="grade"
          radioOptions={gradeOptions}
          control={control}
        />
        <FormRadio
          label="性別"
          name="gender"
          radioOptions={genderOptions}
          control={control}
        />
        <FormRadio
          label="所属ブロック"
          name="block"
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
      </Stack>
      <FormButton
        label={
          state === 'default' || state === 'edit' ? '保存する' : '保存完了👌'
        }
        colorScheme="teal"
        isLoading={state === 'loading'}
        disabled={!errors && (state === 'loading' || state === 'default')}
      />
    </form>
  );
};

export default ProfileChangeForm;
