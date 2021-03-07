import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryConfirmList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: '確認', link: '/entry/confirm' },
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
    <Layout title="エントリー確認">
      <TopHeading title="エントリー確認" linkData={linkData} />
      <Container maxW="xl" py={8} align="center">
        {!entries && entries?.length !== 0 && <Spinner />}
        {entries?.length > 0 && <EntryConfirmList entries={entries} />}
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
      <TabBar />
    </Layout>
  );
};

export default EntryConfirm;
