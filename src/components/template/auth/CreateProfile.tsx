import { Box, Container, Heading, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import Image from 'next/image';
import Router from 'next/router';
import type { VFC } from 'react';
import { useEffect } from 'react';

import { Card } from '@/components/card';
import { useAuth } from '@/context/Auth';
import type { UserInfo } from '@/models/users';
import { screenTransition } from '@/utils/firestore/users';

import { CreateProfileForm } from './CreateProfileForm';

export const CreateProfile: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );

  useEffect(() => {
    !user && Router.push('/signin');
    userInfo && screenTransition(userInfo);
  }, [user, userInfo]);

  return (
    <Box bg="gray.300" minH="100vh">
      <Container maxW="lg" py={[8, 12]}>
        <Card py={[4, 4, 8]} innerPadding={8}>
          <Stack spacing={6} align="center">
            <Heading as="h1" size="lg">
              プロフィール作成
            </Heading>
            <Image
              width={300}
              height={200}
              src="/Images/profile.png"
              alt="Profile"
            />
            <CreateProfileForm />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};
