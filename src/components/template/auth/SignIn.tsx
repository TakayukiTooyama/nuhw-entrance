import { Box, Container, Heading, Icon, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import Image from 'next/image';
import type { VFC } from 'react';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Bounceball } from '@/components/loading';
import { useAuth } from '@/context/Auth';
import type { User } from '@/models/users';
import { auth } from '@/utils/firebase';
import { navigationAfterAuth, screenTransition } from '@/utils/firestore/users';

export const SignIn: VFC = () => {
  // 認証Hooks
  const { login, user, isLoading } = useAuth();

  // ユーザー情報を取得
  const { data: userInfo } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );

  // 状態によっての画面遷移
  useEffect(() => {
    userInfo && screenTransition(userInfo);
  }, [user, userInfo]);

  // Google認証後の動作
  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (result.user || auth.currentUser) {
        result.user && navigationAfterAuth(result.user.uid, result.user.email);
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Box pos="relative" minH="100vh">
          <Bounceball />
        </Box>
      ) : (
        <Box bg="gray.300" minH="100vh">
          <Container maxW="xl" py={[8, 12]}>
            <Card py={[8, 8, 16]} innerPadding={4}>
              <Stack spacing={8} align="center">
                <Heading as="h1">ENTRANCE</Heading>
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
                  onClick={login}
                />
              </Stack>
            </Card>
          </Container>
        </Box>
      )}
    </>
  );
};
