import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';

import { Layout, TabBar, TopHeading } from '@/components/layout';
import { Spinner } from '@/components/loading';
import { EntryList } from '@/components/template';
import { useAuth } from '@/context/Auth';
import type { Entry, Tournament, User } from '@/models/users';
import { screenTransition } from '@/utils/firestore/users';

const linkData = [
  { label: '大会一覧', link: '/entry' },
  { label: '確認', link: '/entry/confirm' },
];

export const Home: NextPage = () => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<User>(
    user ? `users/${user?.uid}` : null
  );

  const { data: entries } = useCollection<Entry>(
    user ? `users/${user?.uid}/entries` : null
  );

  const { data: tournaments, error: tournamentsError } =
    useCollection<Tournament>(
      entries ? `teams/${userInfo?.teamId}/tournaments` : null,
      {
        orderBy: ['startDate', 'desc'],
        parseDates: ['startDate', 'endDate', 'timeLimit'],
      }
    );

  /*
    チーム情報やプロフィール情報を入力したのにもかかわらず、
    誤ってSignIn画面戻ってきてしまった場合
  */
  useEffect(() => {
    userInfo && screenTransition(userInfo);
  }, [userInfo]);

  // 期限内の大会
  const filteredTournament = tournaments?.filter((data) => {
    const tournamentIds = entries?.map((entry) => entry.tournamentId);
    return (
      data.timeLimit > new Date() &&
      data.view &&
      !tournamentIds?.includes(data.id)
    );
  });

  tournamentsError && console.error(tournamentsError);

  return (
    <Layout title="Home">
      <TopHeading title="エントリー" linkData={linkData} />
      <Container maxW="xl" py={8} align="center">
        <Flex
          shadow="inner"
          px={4}
          py={4}
          mb={8}
          bg="gray.100"
          textColor="red.500"
          borderRadius="md"
          fontWeight="bold"
          justify="center"
          align="center"
        >
          <WarningTwoIcon w={5} h={5} mr={3} />
          <Box textAlign="start">
            <Text fontSize={['14px', '16px']}>
              4月からの学年に変更してからエントリーしてください。メニューのプロフィール設定から行えます。
            </Text>
          </Box>
        </Flex>

        {!filteredTournament && <Spinner />}
        {filteredTournament?.length > 0 && (
          <EntryList tournaments={filteredTournament} />
        )}
        {(tournamentsError || filteredTournament?.length === 0) && (
          <Box>
            <Text mb={8}>エントリーできる大会がありません。</Text>
            <Image
              width={350}
              height={250}
              src="/Images/run.png"
              alt="ランニング"
            />
          </Box>
        )}
      </Container>
      <TabBar />
    </Layout>
  );
};

export default Home;
