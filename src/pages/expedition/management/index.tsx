import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { ExpeditionManagementList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Expedition, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

const linkData = [
  { label: '投票', link: '/expedition' },
  { label: '確認', link: '/expedition/confirm' },
];

const ExpenseManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const {
    data: expeditions,
    error: expeditionsError,
  } = useCollection<Expedition>(
    userInfo ? `teams/${userInfo.teamId}/expeditions` : null,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
      listen: true,
    }
  );

  expeditionsError && console.error(expeditionsError);
  return (
    <Layout title="投票管理">
      <TopHeading
        title="投票管理"
        linkData={linkData}
        adminLink="/expedition/management"
      />
      <Container maxW="xl" py={8}>
        <Stack align="center" spacing={6}>
          {!expeditions && <Spinner />}
          {expeditions?.length > 0 && (
            <ExpeditionManagementList
              expeditions={expeditions}
              userInfo={userInfo}
            />
          )}
          {(expeditionsError || expeditions?.length === 0) && (
            <Box align="center">
              <Text mb={8}>作成された投票がありません。</Text>
              <Image
                width={350}
                height={250}
                src="/Images/create.png"
                alt="投票作成"
              />
            </Box>
          )}
          {expeditions && (
            <Button
              label="作成"
              colorScheme="teal"
              onClick={() => Router.push('/expedition/management/create')}
            />
          )}
        </Stack>
      </Container>
      <TabBar />
    </Layout>
  );
};

export default ExpenseManagement;
