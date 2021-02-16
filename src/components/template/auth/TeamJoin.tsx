import { Box, Container, Heading, Img, Stack } from '@chakra-ui/react';
import { useDocument } from '@nandorojo/swr-firestore';
import { Card } from 'components/card';
import { TeamJoinForm } from 'components/template/auth';
import { useAuth } from 'context/Auth';
import { UserInfo } from 'models/users';
import Router from 'next/router';
import React, { useEffect, VFC } from 'react';

const TeamJoin: VFC = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );
  useEffect(() => {
    if (userInfo?.teamId) {
      Router.push('/team/profile');
    }
  }, [userInfo]);

  return (
    <Box bg="gray.300" h="100%">
      <Container maxW="xl" py={8}>
        <Card align="center" p={12}>
          <Stack spacing={8}>
            <Heading as="h1" size="lg">
              チーム参加
            </Heading>
            <Img objectFit="cover" src="/Images/team.png" alt="Team" />
            <TeamJoinForm />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default TeamJoin;
