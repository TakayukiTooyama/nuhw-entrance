import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';
import Router from 'next/router';

import { Button } from '@/components/button';
import { Layout, TabBar, TopHeading } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { EntryManagementList } from '@/components/template';
import { EntryRestore } from '@/components/template/entry';
import { useAuth } from '@/context/Auth';
import type { Tournament, User } from '@/models/users';

const linkData = [
  { label: '大会一覧', link: '/' },
  { label: '確認', link: '/entry/confirm' },
];

const EntryManagement: NextPage = () => {
  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);
  const { data: tournaments, error: tournamentsError } =
    useCollection<Tournament>(
      userInfo ? `teams/${userInfo.teamId}/tournaments` : null,
      {
        orderBy: ['startDate', 'desc'],
        parseDates: ['startDate', 'endDate', 'timeLimit'],
        listen: true,
      }
    );

  tournamentsError && console.error(tournamentsError);
  return (
    <Layout title="エントリー管理">
      <TopHeading
        title="エントリー管理"
        linkData={linkData}
        adminLink="/entry/management"
      />
      <Container maxW="xl" py={8} align="center">
        <Stack align="center" spacing={4}>
          {!tournaments && <Spinner />}
          {tournaments?.length > 0 && (
            <EntryManagementList
              userInfo={userInfo}
              tournaments={tournaments}
            />
          )}
          {(tournamentsError ||
            tournaments?.length === 0 ||
            tournaments?.every((tournament) => !tournament.view)) && (
            <Box>
              <Text mb={8}>作成されたエントリーがありません。</Text>
              <Image
                width={350}
                height={250}
                src="/Images/run.png"
                alt="大会エントリー"
              />
            </Box>
          )}
          {tournaments && (
            <Stack w="100%">
              <Button
                label="作成"
                colorScheme="teal"
                onClick={() => Router.push('/entry/management/create')}
              />
              <EntryRestore
                tournaments={tournaments?.filter(
                  (tournament) => tournament.view === false
                )}
                teamId={userInfo?.teamId}
              />
            </Stack>
          )}
        </Stack>
      </Container>
      <TabBar />
    </Layout>
  );
};

export default EntryManagement;
