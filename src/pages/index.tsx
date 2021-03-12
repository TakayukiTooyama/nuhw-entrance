import { Box, Container, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout, TabBar, TopHeading } from 'components/layout';
import { Spinner } from 'components/loading';
import { EntryList } from 'components/template';
import { useAuth } from 'context/Auth';
import { Entry, Tournament, User } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import { screenTransition } from 'utils/firestore/users';

const linkData = [
  { label: '大会一覧', link: '/' },
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

  const {
    data: tournaments,
    error: tournamentsError,
  } = useCollection<Tournament>(
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
    const tournamentNameArray = entries?.map((entry) => entry.tournamentName);
    return (
      data.timeLimit > new Date() &&
      !tournamentNameArray?.includes(data.tournamentName)
    );
  });

  tournamentsError && console.error(tournamentsError);
  return (
    <Layout title="Home">
      <TopHeading title="エントリー" linkData={linkData} />
      <Container maxW="xl" py={8}>
        {!filteredTournament && <Spinner />}
        {filteredTournament?.length > 0 && (
          <EntryList tournaments={filteredTournament} />
        )}
        {(tournamentsError || filteredTournament?.length === 0) && (
          <Box align="center">
            <Text fontSize={['16px', '18px', '20px']} mb={12}>
              エントリーできる大会がありません。
            </Text>
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
