import { useToast } from '@chakra-ui/toast';
import { Button } from 'components/button';
import { Entry, UserInfo } from 'models/users';
import React, { useState, VFC } from 'react';
import { fuego } from 'utils/firebase';

type Props = { userInfo: UserInfo };

const CreateExpense: VFC<Props> = ({ userInfo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [timeLimit] = useState(new Date());
  const [selectedTournament] = useState({
    tournamentId: '',
    tournamentName: '',
  });
  const toast = useToast();

  const createExpense = async () => {
    const entriesRef = fuego.db.collectionGroup('entries');

    entriesRef
      .where('tournamentId', '==', selectedTournament)
      .get()
      .then((snapshot) => {
        const userExpenseInfo = snapshot.docs.map((doc) => {
          const data = doc.data() as Entry;
          return {
            name: data.name,
            furigana: data.furigana,
            gender: data.gender,
            grade: data.grade,
            // eventsInfo: EventInfo[];
          };
        });
        const newData = {
          tournamentId: selectedTournament.tournamentId,
          tournamentName: selectedTournament.tournamentName,
          timeLimit,
          userExpenseInfo,
        };
        fuego.db
          .collection(`teams/${userInfo.teamId}/expenses`)
          .add(newData)
          .then(() => {
            toast({
              title: '集金作成',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          });
      });
  };
  return (
    <>
      {isEdit ? (
        <Button label="作成" colorScheme="teal" onClick={createExpense} />
      ) : (
        <Button
          label="集金作成"
          colorScheme="teal"
          onClick={() => setIsEdit(true)}
        />
      )}
    </>
  );
};

export default CreateExpense;
