import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { ExpeditionList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Expedition, User, Vote } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [
  { label: '投票', link: '/expedition' },
  { label: '確認', link: '/expedition/confirm' },
];

const ExpeditionPage: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  const { data: votes } = useCollection<Vote>(`users/${user?.uid}/votes`);

  const { data: expeditions, error: expeditionsError } =
    useCollection<Expedition>(
      votes ? `teams/${userInfo?.teamId}/expeditions` : null,
      {
        orderBy: ['startDate', 'desc'],
        parseDates: ['startDate', 'endDate', 'timeLimit'],
      }
    );

  const filteredExpeditions = expeditions?.filter((data) => {
    const tournamentNameArray = votes?.map((vote) => vote.tournamentName);
    return (
      data.timeLimit > new Date() &&
      !tournamentNameArray?.includes(data.tournamentName)
    );
  });

  expeditionsError && console.error(expeditionsError);
  return (
    <Layout title="遠征">
      <TopHeading
        title="移動希望投票"
        linkData={linkData}
        adminLink="/expedition/management"
      />
      <Container maxW="xl" py={8} align="center">
        {!filteredExpeditions && <Spinner />}
        {filteredExpeditions?.length > 0 && (
          <ExpeditionList expeditions={filteredExpeditions} />
        )}
        {(expeditionsError || filteredExpeditions?.length === 0) && (
          <Box>
            <Text mb={8}>移動希望投票がありません。</Text>
            <Image
              width={350}
              height={250}
              src="/Images/create.png"
              alt="遠征"
            />
          </Box>
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default ExpeditionPage;
