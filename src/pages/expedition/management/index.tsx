import { Box, Container, Img, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { ExpeditionManagementList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Expedition, User } from 'models/users';
import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

const linkData = [
  { label: '移動希望投票', link: '/expedition' },
  { label: '投票確認', link: '/expedition/confirm' },
];

const ExpenseManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const {
    data: expeditions,
    error: expeditionsError,
  } = useCollection<Expedition>(`teams/${userInfo?.teamId}/expeditions`, {
    orderBy: ['startDate', 'desc'],
    parseDates: ['startDate', 'endDate', 'timeLimit'],
  });

  expeditionsError && console.error(expeditionsError);
  return (
    <Layout title="投票管理">
      <TopHeading title="投票管理" linkData={linkData} />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!expeditions && expeditions?.length !== 0 && <Spinner />}
          {expeditions?.length > 0 && (
            <ExpeditionManagementList expeditions={expeditions} />
          )}
          {expeditions?.length == 0 && (
            <Box textAlign="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                作成された投票がありません。
              </Text>
              <Img
                maxW={['250px', '350px', '450px']}
                src="/images/create.png"
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
    </Layout>
  );
};

export default ExpenseManagement;
