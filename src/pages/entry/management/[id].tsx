import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Layout } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { EntryManagementTableList } from '@/components/template';
import type { Entry } from '@/models/users';

const EntryManagementDetail: NextPage = () => {
  const router = useRouter();
  const tournamentId = router.query.id;

  const { data: entries, error: entriesError } = useCollection<
    Omit<Entry, 'timeLimit'>
  >('entries', {
    where: ['tournamentId', '==', tournamentId],
    orderBy: [
      ['grade', 'asc'],
      ['furigana', 'asc'],
    ],
    parseDates: ['startDate', 'endDate'],
    isCollectionGroup: true,
  });

  entriesError && console.error(entriesError);
  return (
    <Layout
      title="エントリー詳細情報"
      prevPageLink="/entry/management"
      prevPageTitle="エントリー管理一覧"
    >
      <Container maxW="2xl" py={8} align="center">
        {!entries && <Spinner />}
        {entries?.length > 0 && (
          <EntryManagementTableList
            entries={entries}
            tournamentId={tournamentId}
          />
        )}
        {(entriesError || entries?.length === 0) && (
          <Box>
            <Text mb={12}>まだエントリーされていません。</Text>
            <Image
              width={300}
              height={250}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default EntryManagementDetail;
