import { Stack, Text, useToast } from '@chakra-ui/react';
import { Document, fuego, getCollection } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { InputText } from 'components/input';
import { User } from 'models/users';
import React, { useEffect, useState, VFC } from 'react';

const Inheritance: VFC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  const updateRole = async () => {
    await getCollection<Document<User>>('users', {
      where: ['email', '==', email],
    })
      .then((res) => {
        const uid = res.map((data) => data.id)[0];
        fuego.db
          .collection('users')
          .doc(uid)
          .update({ role: '管理者' })
          .then(() => {
            toast({
              title: '成功',
              description: '管理者が追加されました。',
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            setEmail('');
          });
      })
      .catch(() => {
        setErrorMessage(
          '入力されたGmailが間違っています。本人に聞いた上でもう一度入力してください。'
        );
      });
  };

  useEffect(() => {
    setErrorMessage('');
  }, [email]);

  return (
    <Stack spacing={4}>
      <Card innerPadding={8} bg="gray.100">
        <Stack spacing={4}>
          <InputText
            value={email}
            bg="white"
            type="email"
            placeholder="引き継ぎ(追加)したい人のGmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text color="red.300" textAlign="center">
            {errorMessage}
          </Text>
          <Button label="追加" colorScheme="teal" onClick={updateRole} />
        </Stack>
      </Card>
      <Text color="gray.400" px={8}>
        ※登録したGmailアドレスを本人から聞いてください。
      </Text>
    </Stack>
  );
};

export default Inheritance;
