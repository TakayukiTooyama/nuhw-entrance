import { Box, Img, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryManagementTableList } from 'components/template';
import { Entry } from 'models/users';
import { NextPage } from 'next';
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
      <Box px={[4, 12]} py={12} align="center">
        {!entries && entries?.length !== 0 && <Spinner />}
        {entries?.length > 0 && <EntryManagementTableList entries={entries} />}
        {entries?.length == 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              まだエントリーされていません。
            </Text>
            <Img
              maxW={['250px', '350px', '450px']}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default EntryManagementDetail;
