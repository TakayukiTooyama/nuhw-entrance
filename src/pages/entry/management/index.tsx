import { Box, Container, Img, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryManagementList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Tournament, User } from 'models/users';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: 'エントリー済', link: '/entry/confirm' },
];

const EntryManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );
  const {
    data: tournaments,
    error: tournamentsError,
  } = useCollection<Tournament>(
    userInfo ? `teams/${userInfo.teamId}/tournaments` : null,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
    }
  );

  tournamentsError && console.error(tournamentsError);
  return (
    <Layout title="エントリー管理">
      <TopHeading title="エントリー管理" linkData={linkData} />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!tournaments && tournaments?.length !== 0 && <Spinner />}
          {tournaments?.length > 0 && (
            <EntryManagementList tournaments={tournaments} />
          )}
          {tournaments?.length == 0 && (
            <Box textAlign="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                作成されたエントリーがありません。
              </Text>
              <Img
                maxW={['250px', '350px', '450px']}
                src="/Images/management.svg"
                alt="管理"
              />
            </Box>
          )}
          {tournaments && (
            <Button
              label="作成"
              colorScheme="teal"
              onClick={() => Router.push('/entry/management/create')}
            />
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default EntryManagement;
