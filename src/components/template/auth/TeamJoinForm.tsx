import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { FormButton } from 'components/button';
import InputText from 'components/input/InputText';
import { LinkText } from 'components/text';
import { useAuth } from 'context/Auth';
import { TeamInfo, User } from 'models/users';
import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

const TeamJoinForm: VFC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: teams } = useCollection<TeamInfo>('teams');
  const { set } = useDocument<User>(`users/${user?.uid}`);

  const [name, setName] = useState('新潟医療福祉大学');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
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
          type={show ? 'text' : 'password'}
          rightElement={
            show ? (
              <ViewIcon onClick={() => setShow(false)} />
            ) : (
              <ViewOffIcon onClick={() => setShow(true)} />
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
      <LinkText
        textAlign="center"
        link="/team/create"
        text="チーム作成はこちら"
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
      />
    </>
  );
};

export default TeamJoinForm;
