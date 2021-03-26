import { Box, Container, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { fuego } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { User } from 'models/users';
import Image from 'next/image';
import Router from 'next/router';
import { useState, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth, FirebaseTimestamp } from 'utils/firebase';

const SignIn: VFC = () => {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    auth.signInAnonymously().then(async (res) => {
      if (res.user) {
        const usersRef = fuego.db.collection('users');
        const userData: User = {
          uid: res.user.uid,
          name: 'デモ太朗',
          furigana: 'デモタロウ',
          email: '',
          teamId: 'ArGVWNdGzoBdGUgA6zkW',
          gender: '男',
          grade: '3年',
          block: '短距離',
          role: '管理者',
          createdAt: FirebaseTimestamp.now(),
        };
        await usersRef
          .doc(userData.uid)
          .set(userData)
          .then(() => {
            Router.push('/');
          });
      }
    });
  };

  return (
    <Box bg="gray.300" minH="100vh">
      <Container maxW="xl" py={[8, 12]}>
        <Card py={[8, 8, 16]} innerPadding={4}>
          <Stack spacing={8} align="center">
            <Heading>ENTRANCE</Heading>
            <Image
              width={300}
              height={200}
              src="/Images/login.png"
              alt="Login"
            />
            <Button
              maxW="300px"
              label="ログイン"
              leftIcon={<Icon as={FcGoogle} w={6} h={6} />}
              isLoading={loading}
              onClick={login}
            />
            <Text color="gray" maxW="300px">
              こちらはDemoとなるため匿名認証、チーム登録省略、プロフィール登録省略となっております。
              ログアウト後は正規のログイン画面に遷移します。
              もう一度入りたい場合はポートフォリオのリンクからお願いします。
            </Text>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default SignIn;
