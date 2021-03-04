import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryManagementList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Tournament, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: 'エントリー済', link: '/entry/confirm' },
];

const EntryManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const {
    data: tournaments,
    error: tournamentsError,
  } = useCollection<Tournament>(
    userInfo ? `teams/${userInfo.teamId}/tournaments` : null,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
      listen: true,
    }
  );

  tournamentsError && console.error(tournamentsError);
  return (
    <Layout title="エントリー管理">
      <TopHeading title="エントリー管理" linkData={linkData} />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!tournaments && tournaments?.length !== 0 && <Spinner />}
          {tournaments?.length > 0 &&
            tournaments.map((data) => (
              <EntryManagementList
                key={data.id}
                tournament={data}
                userInfo={userInfo}
              />
            ))}
          {tournaments?.length === 0 && (
            <Box textAlign="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                作成されたエントリーがありません。
              </Text>
              <Image width={300} height={200} src="/Images/management.svg" />
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
