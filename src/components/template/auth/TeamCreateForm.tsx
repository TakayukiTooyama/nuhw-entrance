/* eslint-disable no-irregular-whitespace */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, InputRightElement, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Document,
  getCollection,
  useCollection,
  useDocument,
} from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import { FormText } from 'components/input';
import { useAuth } from 'context/Auth';
import { TeamInfo, TeamInfoInForm, User } from 'models/users';
import Router from 'next/router';
import { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { object, ref, SchemaOf, string } from 'yup';

const defaultValues: TeamInfoInForm = {
  name: '',
  password: '',
  passwordConfirmation: '',
};

const TeamCreateForm: VFC = () => {
  const { user } = useAuth();
  const { data: teams, add } = useCollection<TeamInfo>('teams');
  const { set } = useDocument<User>(`users/${user?.uid}`);

  const validateDuplicatedName = (name: string): boolean => {
    return teams.every((info) => info.name !== name);
  };

  // 重複がないようにバリデーションするためにここに書いている
  const schema: SchemaOf<TeamInfoInForm> = object().shape({
    name: string()
      .matches(/^[ぁ-んァ-ン一-龥( |　)]+$/, '全角文字で入力してください。')
      .required('大学名を入力してください。')
      .test('name', 'すでに使われている大学名です', validateDuplicatedName),
    password: string().required('パスワードを入力して下さい。'),
    passwordConfirmation: string().oneOf(
      [ref('password'), null],
      '入力したパスワードと違います。'
    ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TeamInfoInForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  // パスワードを見る/隠す
  const [show, setShow] = useState(false);

  // チーム作成処理
  const onSubmit = (data: TeamInfoInForm) => {
    // 入力した文字列は空白削除
    const teamData: TeamInfo = {
      name: data.name.replace(/\s+/g, ''),
      password: data.password,
    };
    add(teamData).then(async () => {
      await getCollection<Document<TeamInfo>>('teams').then((teams) => {
        const teamId = teams
          .filter((data) => data.name === teamData.name)
          .map((team) => team.id)[0];
        set({ role: '管理者', teamId }, { merge: true }).then(() => {
          Router.push('/');
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormText
          name="name"
          placeholder="大学名"
          errors={errors}
          control={control}
        />
        <FormText
          name="password"
          placeholder="パスワード"
          type={show ? 'text' : 'password'}
          errors={errors}
          control={control}
        >
          <InputRightElement width="4.5rem">
            <IconButton
              bg="none"
              size="sm"
              aria-label="toggle-icon"
              icon={show ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShow(!show)}
              _focus={{ boxShadow: 'none' }}
              _active={{ bg: 'none' }}
              _hover={{ bg: 'none' }}
            />
          </InputRightElement>
        </FormText>
        <FormText
          name="passwordConfirmation"
          placeholder="パスワード確認"
          type="password"
          errors={errors}
          control={control}
        />
        <FormButton
          label="作成"
          bg="pink.300"
          color="white"
          isLoading={isSubmitting}
        />
      </Stack>
    </form>
  );
};

export default TeamCreateForm;
