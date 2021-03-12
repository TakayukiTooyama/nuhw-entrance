import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { VoteConfirmList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Vote } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [
  { label: '投票', link: '/expedition' },
  { label: '確認', link: '/expedition/confirm' },
];

const ExpeditionConfirm: NextPage = () => {
  const { user } = useAuth();

  const { data: votes, error: votesError } = useCollection<Vote>(
    `users/${user?.uid}/votes`,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
      listen: true,
    }
  );

  votesError && console.error(votesError);
  return (
    <Layout title="投票確認">
      <TopHeading
        title="投票確認"
        linkData={linkData}
        adminLink="/expedition/management"
      />
      <Container maxW="xl" py={8} align="center">
        {!votes && <Spinner />}
        {votes?.length > 0 && <VoteConfirmList votes={votes} />}
        {(votesError || votes?.length === 0) && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              投票されていません。
            </Text>
            <Image
              width={300}
              height={200}
              src="/Images/vote.png"
              alt="投票確認"
            />
          </Box>
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default ExpeditionConfirm;
