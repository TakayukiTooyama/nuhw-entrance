import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Img } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { LinkText } from 'components/text';
import { useAuth } from 'context/Auth';
import { User } from 'models/users';
import { useEffect, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from 'utils/firebase';
import { navigationAfterAuth, screenTransition } from 'utils/firestore/users';

const SignIn: VFC = () => {
  const { login, user } = useAuth();
  const toast = useToast();
  const { data: userInfo } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );

  useEffect(() => {
    userInfo && screenTransition(userInfo);
  }, [user, userInfo]);

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (result.user || auth.currentUser) {
        toast({
          title: 'ログイン成功',
          status: 'success',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
        result.user && navigationAfterAuth(result.user.uid, result.user.email);
      }
    });
  }, [toast]);

  return (
    <Box bg="gray.300" minH="100vh">
      <Container maxW="xl" py={[8, 12]}>
        <Card py={[8, 8, 16]} innerPadding={4}>
          <Stack spacing={8} align="center">
            <Heading>ENTRANCE</Heading>
            <Img objectFit="cover" src="/Images/login.png" alt="Login" />

            <Button
              maxW="300px"
              label="ログイン"
              leftIcon={<Icon as={FcGoogle} w={6} h={6} />}
              onClick={login}
            />
            <HStack justify="center">
              <LinkText link="/terms" text="利用規約" />
              <LinkText link="/policy" text="プライバシーポリシー" />
            </HStack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default SignIn;
