import { Select } from '@chakra-ui/react';
import { Document, fuego } from '@nandorojo/swr-firestore';
import { Tournament } from 'models/users';
import React from 'react';
import { ChangeEvent } from 'react';
import { VFC } from 'react';

type Props = {
  tournaments: Document<Tournament>[];
  teamId: string;
};

const EntryRestore: VFC<Props> = ({ tournaments, teamId }) => {
  const restore = async (e: ChangeEvent<HTMLSelectElement>) => {
    const tournamentId = e.target.value;
    if (!tournamentId) return;
    await fuego.db
      .doc(`teams/${teamId}/tournaments/${tournamentId}`)
      .update({ view: true });
  };

  return (
    <Select
      placeholder="大会データ復元"
      color="gray"
      onChange={restore}
      borderRadius="30px"
    >
      {tournaments.map((tournament: Document<Tournament>) => (
        <option key={tournament.id} value={tournament.id}>
          {tournament.tournamentName}
        </option>
      ))}
    </Select>
  );
};

export default EntryRestore;
