import { Heading, SimpleGrid } from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { VoteManagementTable } from 'components/template/expedition';
import { Vote } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  votes: Document<Vote>[];
  rideLabels: string[];
};

const VoteManagementTableList: VFC<Props> = ({ votes, rideLabels }) => {
  const tables = rideLabels.map((label) => {
    return {
      label,
      votes: votes.filter((vote) => {
        return (
          (vote.busInfo !== '' &&
            label ===
              `${vote.busInfo.turn}便 / ${vote.busInfo.busNumber}号車 / ${vote.busInfo.departureTime}`) ||
          (vote.carInfo !== '' && label === `${vote.carInfo.carName}の車`)
        );
      }),
    };
  });

  return (
    <>
      <Heading mb={12}>{votes[0]?.tournamentName}</Heading>
      <SimpleGrid
        maxW={['md', 'md', '100%']}
        columns={[1, 1, 2]}
        spacingX={8}
        spacingY={8}
      >
        {tables.map((data) => (
          <VoteManagementTable
            key={data.label}
            votes={data.votes}
            label={data.label}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default VoteManagementTableList;
