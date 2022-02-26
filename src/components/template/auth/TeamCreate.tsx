import { Box, Container, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';
import type { VFC } from 'react';
import { useEffect } from 'react';

import { Card } from '@/components/card';
import { TeamCreateForm } from '@/components/template/auth';
import { useAuth } from '@/context/Auth';

export const TeamCreate: VFC = () => {
  const { user } = useAuth();

  useEffect(() => {
    !user && Router.push('/signin');
  }, [user]);

  return (
    <Box bg="gray.300" minH="100vh">
      <Container maxW="lg" py={[8, 12]}>
        <Card py={[4, 4, 8]} innerPadding={8}>
          <Stack spacing={6} align="center">
            <Heading as="h1" size="lg">
              チーム作成
            </Heading>
            <Image
              width={300}
              height={200}
              src="/Images/create-team.png"
              alt="チーム作成"
            />
          </Stack>
          <TeamCreateForm />
        </Card>
      </Container>
    </Box>
  );
};
