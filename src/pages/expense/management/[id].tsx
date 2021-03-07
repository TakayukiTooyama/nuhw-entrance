import { Box, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryManagementTableList } from 'components/template';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ExpenseManagementDetail: NextPage = () => {
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
      title="集金管理"
      prevPageLink="/expense/management"
      prevPageTitle="大会集金"
    >
      <Box px={[4, 12]} py={8} align="center">
        {!entries && entries?.length !== 0 && <Spinner />}
        {entries?.length > 0 && <EntryManagementTableList entries={entries} />}
        {entries?.length === 0 && (
          <Box>
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              まだエントリーされていません。
            </Text>
            <Image
              width={300}
              height={200}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ExpenseManagementDetail;
