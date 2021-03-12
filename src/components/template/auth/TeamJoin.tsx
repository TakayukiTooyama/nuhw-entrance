import { Box, Container, Heading, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Card } from 'components/card';
import { TeamJoinForm } from 'components/template/auth';
import { useAuth } from 'context/Auth';
import { UserInfo } from 'models/users';
import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect, VFC } from 'react';
import { screenTransition } from 'utils/firestore/users';

const TeamJoin: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(`users/${user?.uid}`);

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
              チーム参加
            </Heading>
            <Image width={300} height={200} src="/Images/team.png" alt="Team" />
            <TeamJoinForm />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default TeamJoin;
