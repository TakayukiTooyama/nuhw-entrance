import { Box, Container, Heading, Img, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Card } from 'components/card';
import { useAuth } from 'context/Auth';
import { UserInfo } from 'models/users';
import Router from 'next/router';
import React, { useEffect, VFC } from 'react';

import CreateProfileForm from './CreateProfileForm';

const CreateProfile: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );
  useEffect(() => {
    if (userInfo?.role) {
      Router.push('/');
    }
  }, [userInfo]);

  return (
    <Box bg="gray.300" h="100%">
      <Container maxW="xl" py={8}>
        <Card align="center" p={12}>
          <Stack spacing={8}>
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
