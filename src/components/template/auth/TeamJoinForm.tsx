import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import type { VFC } from 'react';
import { useEffect, useState } from 'react';

import { FormButton } from '@/components/button';
import { InputText } from '@/components/input';
import { useAuth } from '@/context/Auth';
import type { TeamInfo, User } from '@/models/users';

export const TeamJoinForm: VFC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: teams } = useCollection<TeamInfo>('teams');
  const { set } = useDocument<User>(`users/${user?.uid}`);

  const [name, setName] = useState('新潟医療福祉大学');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // チームに参加する処理
  const userJoinToTeam = () => {
    setIsSubmitting(true);

    const selectedTeam = teams.filter((data) => data.name === name)[0];
    if (selectedTeam.password === password) {
      set({ teamId: selectedTeam.id }, { merge: true }).then(() => {
        router.push('/');
      });
    } else {
      setIsSubmitting(false);
      setErrorMessage('パスワードが間違っています');
    }
  };

  // パスワードを入力するたびにエラーをリセット
  useEffect(() => {
    setErrorMessage('');
  }, [password]);

  return (
    <>
      <InputText
        value={name}
        placeholder="大学名"
        onChange={(e) => setName(e.target.value)}
      />
      <Box w="100%">
        <InputText
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          type={isShow ? 'text' : 'password'}
          rightElement={
            isShow ? (
              <ViewIcon onClick={() => setIsShow(false)} />
            ) : (
              <ViewOffIcon onClick={() => setIsShow(true)} />
            )
          }
        />
        {errorMessage && (
          <Text color="red.300" textAlign="center" mt={2}>
            {errorMessage}
          </Text>
        )}
      </Box>
      <FormButton
        label="参加"
        bg="pink.300"
        color="white"
        onClick={userJoinToTeam}
        isLoading={isSubmitting}
      />
    </>
  );
};
