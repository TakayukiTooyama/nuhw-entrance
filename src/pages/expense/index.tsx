import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
// import { ExpenseList } from 'components/template/expense';
import { useAuth } from 'context/Auth';
import { Tournament, UserInfo } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

const Expense: NextPage = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(
    user ? `users/${user.uid}` : null
  );
  const { error: tournamentsError } = useCollection<Tournament>(
    userInfo ? `teams/${userInfo.teamId}/tournaments` : null
  );

  const { data: expenses, error: expensesError } = useCollection(
    userInfo ? `teams/${userInfo.teamId}/expenses` : null
  );

  // expensesError && console.error(expensesError);
  tournamentsError && console.error(tournamentsError);

  return (
    <Layout title="集金">
      <TopHeading title="大会集金" adminLink="/expense/management" />
      <Container maxW="xl" py={8}>
        <Stack align="center" spacing={8}>
          {!expenses && <Spinner />}

          {/* {expenses?.length > 0 &&
              expenses.map((entry) => (
                <ExpenseList key={entry.id} entry={entry} />
                ))} */}
          {(expensesError || expenses?.length === 0) && (
            <Box align="center">
              <Text mb={8}>集金を行う大会がありません。</Text>
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

export default Expense;
