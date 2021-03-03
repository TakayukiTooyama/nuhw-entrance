import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { ExpenseList } from 'components/template/expense';
import { useAuth } from 'context/Auth';
import { Expense, Tournament, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const linkData = [{ label: '集金一覧', link: '/expense' }];

const ExpenseManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  const { data: tounaments } = useCollection<Tournament>(
    `teams/${userInfo?.teamId}/tournaments`
  );

  const { data: expenses, error: expensesError } = useCollection<Expense>(
    tounaments ? `users/${user?.uid}/expenses` : null,
    {
      orderBy: ['startDate', 'asc'],
      parseDates: ['startDate', 'endDate'],
    }
  );

  expensesError && console.error(expensesError);
  return (
    <Layout title="集金">
      <TopHeading title="大会集金" linkData={linkData} />
      <Container maxW="xl" py={12}>
        <Stack align="center" spacing={8}>
          {!expenses && expenses?.length !== 0 && <Spinner />}
          {expenses?.length > 0 && (
            <>
              {expenses.map((expense) => (
                <ExpenseList key={expense.id} expense={expense} />
              ))}
              {/* {tounaments.map((entry) => (
                <ExpenseList key={entry.id} entry={entry} />
              ))} */}
            </>
          )}

          {expenses?.length === 0 && (
            <Box align="center">
              <Text fontSize={['16px', '18px', '20px']} mb={8}>
                全て大会の集金が終わっています。
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

export default ExpenseManagement;
