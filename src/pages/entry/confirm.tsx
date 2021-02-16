import { Box, Container, Img, Stack, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryConfirmList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import React from 'react';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: 'エントリー済', link: '/entry/confirm' },
];

const EntryConfirm: NextPage = () => {
  const { user } = useAuth();

  const { data: entries, error: entriesError } = useCollection<Entry>(
    `users/${user?.uid}/entries`,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
    }
  );

  entriesError && console.error(entriesError);
  return (
    <Layout title="エントリー済 大会一覧">
      <TopHeading title="エントリー済一覧" linkData={linkData} />
      <Container maxW="xl" py={12} align="center">
        {!entries && entries?.length !== 0 && <Spinner />}
        {entries?.length > 0 && (
          <Stack spacing={8}>
            <EntryConfirmList entries={entries} />
            <Text textAlign="left" color="gray.400">
              ※エントリーを変更したい場合は、一度削除し、再びエントリーしてください。
            </Text>
          </Stack>
        )}
        {entries?.length == 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              エントリー済みの大会がありません。
            </Text>
            <Img
              maxW={['250px', '350px', '450px']}
              src="/images/confirm.png"
              alt="ランニング"
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default EntryConfirm;
