import { Box, Container, Heading, HStack, Icon, Stack } from '@chakra-ui/react';
import { Img } from '@chakra-ui/react';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { Spinner } from 'components/loading';
import { LinkText } from 'components/text';
import { useAuth } from 'context/Auth';
import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { auth } from 'utils/firebase';
import { navigationAfterAuth } from 'utils/firestore/users';

const SignIn: VFC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const { pathname } = useRouter();

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (result.user || auth.currentUser) {
        if (result.user !== null) {
          navigationAfterAuth(result.user.uid);
        }
      } else {
        pathname === '/signin' && setLoading(false);
      }
    });
  }, [pathname]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box bg="gray.300" h="100vh">
          <Container maxW="xl" py={12}>
            <Card py={16}>
              <Stack spacing={8} align="center">
                <Heading>ENTRANCE</Heading>
                <Img objectFit="cover" src="/images/login.png" alt="Login" />

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
      )}
    </>
  );
};

export default SignIn;
