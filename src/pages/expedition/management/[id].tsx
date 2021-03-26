import { Box, Text } from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Layout } from 'components/layout';
import { Spinner } from 'components/loading';
import { VoteManagementTableList } from 'components/template/expedition';
import { useAuth } from 'context/Auth';
import { Expedition, User, Vote } from 'models/users';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ExpeditionManagementDetail: NextPage = () => {
  const router = useRouter();
  const expeditionId = router.query.id;

  const { user } = useAuth();

  const { data: userInfo } = useDocument<User>(`users/${user?.uid}`);

  const { data: expedition } = useDocument<Expedition>(
    expeditionId
      ? `teams/${userInfo?.teamId}/expeditions/${expeditionId}`
      : null
  );

  const { data: votes, error: votesError } = useCollection<Vote>(
    expedition ? 'votes' : null,
    {
      where: [
        ['tournamentId', '==', expedition?.tournamentId],
        ['day', '==', expedition?.day],
        ['course', '==', expedition?.course],
      ],
      orderBy: ['grade', 'asc'],
      parseDates: ['startDate', 'endDate'],
      isCollectionGroup: true,
    }
  );

  const busLabels = expedition?.busInfo?.map(
    (data) => `${data.turn}便 / ${data.busNumber}号車 / ${data.departureTime}`
  );
  const carLabels = expedition?.carInfo?.map((data) => `${data.carName}の車`);
  const rideLabels = busLabels?.concat(carLabels);

  votesError && console.error(votesError);
  return (
    <Layout
      title="投票結果"
      prevPageLink="/expedition/management"
      prevPageTitle="投票管理"
    >
      <Box px={[4, 12]} py={8} align="center">
        {!votes && <Spinner />}
        {votes?.length > 0 && (
          <VoteManagementTableList votes={votes} rideLabels={rideLabels} />
        )}
        {(votesError || votes?.length === 0) && (
          <Box>
            <Text mb={12}>まだ投票されていません。</Text>
            <Image
              width={300}
              height={250}
              src="/Images/no-data.png"
              alt="管理"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ExpeditionManagementDetail;
