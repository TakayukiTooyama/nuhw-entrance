import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryManagementTableList } from 'components/template';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const EntryManagementDetail: NextPage = () => {
  const router = useRouter();
  const tournamentId = router.query.id;

  const { data: entries, error: entriesError } = useCollection<
    Omit<Entry, 'timeLimit'>
  >('entries', {
    where: ['tournamentId', '==', tournamentId],
    orderBy: ['grade', 'asc'],
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
      <Container maxW="2xl" py={12} align="center">
        {!entries && entries?.length !== 0 && <Spinner />}
        {entries?.length > 0 && <EntryManagementTableList entries={entries} />}
        {entries?.length === 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              まだエントリーされていません。
            </Text>
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
