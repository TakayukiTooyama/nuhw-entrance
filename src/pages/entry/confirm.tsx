import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryConfirmList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: 'エントリー済', link: '/entry/confirm' },
];

const EntryConfirm: NextPage = () => {
  const { user } = useAuth();

  const { data: entries, error: entriesError } = useCollection<Entry>(
    user ? `users/${user?.uid}/entries` : null,
    {
      orderBy: ['startDate', 'desc'],
      parseDates: ['startDate', 'endDate', 'timeLimit'],
      listen: true,
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
            <Text textAlign="left" color="gray.400" px={4}>
              ※エントリーを変更したい場合は、一度削除し、再びエントリーしてください。
            </Text>
          </Stack>
        )}
        {entries?.length === 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              エントリー済みの大会がありません。
            </Text>
            <Image
              width={300}
              height={300}
              src="/Images/confirm.png"
              alt="ランニング"
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default EntryConfirm;
