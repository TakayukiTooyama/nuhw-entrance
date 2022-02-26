import { Select } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import { fuego } from '@nandorojo/swr-firestore';
import type { ChangeEvent } from 'react';
import type { VFC } from 'react';

import type { Tournament } from '@/models/users';

type Props = {
  tournaments: Document<Tournament>[];
  teamId: string;
};

export const EntryRestore: VFC<Props> = ({ tournaments, teamId }) => {
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
