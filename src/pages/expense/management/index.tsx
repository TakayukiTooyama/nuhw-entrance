import { Box, Container, Img, Stack, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { ExpenseList } from 'components/template/expense';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import React from 'react';

const linkData = [{ label: '集金一覧', link: '/expense' }];

const ExpenseManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: entries, error: entriesError } = useCollection<Entry>(
    `users/${user?.uid}/entries`,
    {
      orderBy: ['startDate', 'asc'],
      parseDates: ['startDate', 'endDate'],
    }
  );

  entriesError && console.error(entriesError);
  return (
    <Layout title="集金">
      <TopHeading title="大会集金" linkData={linkData} />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!entries && entries?.length !== 0 && <Spinner />}
          {entries?.length > 0 &&
            entries.map((entry) => (
              <ExpenseList key={entry.id} entry={entry} />
            ))}
          {entries?.length == 0 && (
            <Box align="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                全て大会の集金が終わっています。
              </Text>
              <Img
                maxW={['250px', '350px', '450px']}
                src="/Images/money-management.png"
                alt="管理"
              />
            </Box>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default ExpenseManagement;
