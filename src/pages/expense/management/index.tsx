import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { useAuth } from 'context/Auth';
import { Expense, Tournament, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [{ label: '集金一覧', link: '/expense' }];

const ExpenseManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  const { data: tournaments } = useCollection<Tournament>(
    `teams/${userInfo?.teamId}/tournaments`
  );

  const { data: expenses, error: expensesError } = useCollection<Expense>(
    tournaments ? `users/${user?.uid}/expenses` : null,
    {
      orderBy: ['startDate', 'asc'],
      parseDates: ['startDate', 'endDate'],
    }
  );

  expensesError && console.error(expensesError);
  return (
    <Layout title="集金">
      <TopHeading
        title="大会集金"
        linkData={linkData}
        adminLink="/expense/management"
      />
      <Container maxW="xl" py={8}>
        <Stack align="center" spacing={8}>
          {!tournaments && !expenses && <Spinner />}
          {/* {tournaments?.length && expenses?.length > 0 && (
            <ExpenseList expenses={expenses} />
          )} */}

          {expenses?.length === 0 && (
            <Box align="center">
              <Text mb={8}>全て大会の集金が終わっています。</Text>
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
      <TabBar />
    </Layout>
  );
};

export default ExpenseManagement;
