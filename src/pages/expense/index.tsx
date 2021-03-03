import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
// import { ExpenseList } from 'components/template/expense';
import { useAuth } from 'context/Auth';
import { Entry } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const Expense: NextPage = () => {
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
      <TopHeading title="大会集金" />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!entries && entries?.length !== 0 && <Spinner />}
          {/* {entries?.length > 0 &&
            entries.map((entry) => (
              <ExpenseList key={entry.id} entry={entry} />
              ))} */}
          {entries?.length === 0 && (
            <Box align="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                集金を行う大会がありません。
              </Text>
              <Image
                width={300}
                height={200}
                src="/Images/expense.png"
                alt="管理"
              />
            </Box>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default Expense;
