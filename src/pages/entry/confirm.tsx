import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';

import { Layout, TabBar, TopHeading } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { EntryConfirmList } from '@/components/template';
import { useAuth } from '@/context/Auth';
import type { Entry } from '@/models/users';

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
      <TopHeading
        title="エントリー確認"
        linkData={linkData}
        adminLink="/entry/management"
      />
      <Container maxW="xl" py={8} align="center">
        {!entries && <Spinner />}
        {entries?.length > 0 && <EntryConfirmList entries={entries} />}
        {entries?.length === 0 && (
          <Box>
            <Text mb={8}>エントリー済みの大会がありません。</Text>
            <Image
              width={350}
              height={250}
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
