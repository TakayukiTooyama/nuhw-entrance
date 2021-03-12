import {
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Document, fuego, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { DeleteDialog } from 'components/dialog';
import { useAuth } from 'context/Auth';
import { UniformInfo, UserInfo } from 'models/users';
import React, { useRef, VFC } from 'react';

import UniformTable from './UniformTable';

type Props = {
  data: Document<UniformInfo>;
};

const UniformConfirmCard: VFC<Props> = ({ data }) => {
  const { user } = useAuth();
  const { data: userInfo } = useDocument<UserInfo>(`users/${user?.uid}`);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const uniformDelete = async () => {
    await fuego.db
      .doc(`users/${user.uid}/orders/${data.id}`)
      .delete()
      .then(() => {
        onClose();
        toast({
          title: '成功',
          description: '発注を取り消しました。',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <DeleteDialog
        title=""
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onDelete={uniformDelete}
      >
        <Text textAlign="center">発注を完全に取り消してもよろしいですか？</Text>
      </DeleteDialog>
      <Card innerPadding={6}>
        <Heading as="h2" size="lg" textAlign="center">
          発注表
        </Heading>
        <Divider maxW="50px" mx="auto" mb={6} />
        <Stack spacing={6}>
          <Flex justify="space-between" color="gray.400">
            <Text>{userInfo.name} 様</Text>
            <Text>発注日：{data.orderDate}</Text>
          </Flex>
          <UniformTable orderList={data.order} />
          <Button label="発注を取り消す" onClick={onOpen} />
        </Stack>
      </Card>
    </>
  );
};

export default UniformConfirmCard;
