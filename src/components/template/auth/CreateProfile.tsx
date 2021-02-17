import { Box, Container, Heading, Img, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Card } from 'components/card';
import { useAuth } from 'context/Auth';
import { UserInfo } from 'models/users';
import Router from 'next/router';
import React, { useEffect, VFC } from 'react';
import { screenTransition } from 'utils/firestore/users';

import CreateProfileForm from './CreateProfileForm';

const CreateProfile: VFC = () => {
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
      <Container maxW="xl" py={[8, 12]}>
        <Card py={[8, 8, 16]} innerPadding={4}>
          <Stack spacing={8} align="center">
            <Heading as="h1" size="lg">
              プロフィール作成
            </Heading>
            <Img objectFit="cover" src="/Images/profile.png" alt="Profile" />
            <CreateProfileForm />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateProfile;
