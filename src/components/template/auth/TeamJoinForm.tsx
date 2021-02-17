import { CheckIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { FormButton } from 'components/button';
import InputText from 'components/input/InputText';
import { useAuth } from 'context/Auth';
import { useState, VFC } from 'react';
import { userJoinToTeam } from 'utils/firestore/users';

const TeamJoinForm: VFC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('新潟医療福祉大学');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <InputText
        value={name}
        placeholder="大学名"
        onChange={(e) => setName(e.target.value)}
        rightElement={
          name === '新潟医療福祉大学' && <CheckIcon color="green.400" />
        }
      />
      <InputText
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        rightElement={
          errorMessage === '' &&
          password.length >= 4 && <CheckIcon color="green.400" />
        }
      />
      <FormButton
        label="参加"
        bg="pink.300"
        color="white"
        onClick={() =>
          userJoinToTeam(user?.uid, password, setIsSubmitting, setErrorMessage)
        }
        isLoading={isSubmitting}
      />
      <Text color="red.300">{errorMessage}</Text>
    </>
  );
};

export default TeamJoinForm;
