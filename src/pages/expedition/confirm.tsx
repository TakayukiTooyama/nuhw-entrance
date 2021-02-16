import { Box, Container, Img, Stack, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { VoteConfirmList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Vote } from 'models/users';
import { NextPage } from 'next';
import React from 'react';

const linkData = [
  { label: '移動希望投票', link: '/expedition' },
  { label: '投票確認', link: '/expedition/confirm' },
];

const ExpeditionConfirm: NextPage = () => {
  const { user } = useAuth();

  const { data: votes, error: votesError } = useCollection<Vote>(
    `users/${user?.uid}/votes`,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
    }
  );

  votesError && console.error(votesError);
  return (
    <Layout title="投票済 大会一覧">
      <TopHeading title="投票済一覧" linkData={linkData} />
      <Container maxW="xl" py={12} align="center">
        {!votes && votes?.length !== 0 && <Spinner />}
        {votes?.length > 0 && (
          <Stack spacing={8}>
            <VoteConfirmList votes={votes} />
            <Text textAlign="left" color="gray.400">
              ※投票を変更したい場合は、一度削除し、再び投票してください。
            </Text>
          </Stack>
        )}
        {votes?.length == 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              投票されていません。
            </Text>
            <Img
              maxW={['250px', '350px', '450px']}
              src="/Images/vote.png"
              alt="投票確認"
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ExpeditionConfirm;
