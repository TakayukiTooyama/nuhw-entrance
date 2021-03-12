import {
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { ConfirmDialog } from 'components/dialog';
import { UniformManagementTable } from 'components/template/uniform';
import { UniformInfo } from 'models/users';
import Router from 'next/router';
import React, { useRef, useState, VFC } from 'react';

type Props = {
  orders: Document<UniformInfo>[];
};

const UnifomrManagementTableList: VFC<Props> = ({ orders }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [genderToggle, setGenderToggle] = useState<'男' | '女'>('男');
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef();

  const manData = orders.filter((data) => data.gender === '男');
  const womanData = orders.filter((data) => data.gender === '女');

  const appendSpreadsheet = async () => {
    setLoading(true);
    try {
      const manTableAppendData = manData.map((info) => {
        const sizeData = info.order.flatMap((data) => data.size);
        return [info.name, ...sizeData, info.orderDate];
      });
      const womanTableAppendData = womanData.map((info) => {
        const sizeData = info.order.flatMap((data) => data.size);
        return [info.name, ...sizeData, info.orderDate];
      });
      const manTableResponse = await fetch(
        'https://v1.nocodeapi.com/sphacks/google_sheets/rWCufIptQSvrrKkj?tabId=男子',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(manTableAppendData),
        }
      );
      const wonmanTableResponse = await fetch(
        'https://v1.nocodeapi.com/sphacks/google_sheets/rWCufIptQSvrrKkj?tabId=女子',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(womanTableAppendData),
        }
      );
      await manTableResponse.json().then(async () => {
        await wonmanTableResponse.json().then(() => {
          toast({
            title: '書き込み成功',
            description: 'スプレッドシートにデータが書き込まれました。',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          Router.push('/uniform/management');
        });
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Heading as="h1" size="lg" mb={12}>
        {orders[0].title}
      </Heading>
      <Stack spacing={8}>
        <HStack maxW="xl" mx="auto" w="100%">
          <Button
            label="男子"
            colorScheme={genderToggle === '男' ? 'teal' : 'gray'}
            onClick={() => setGenderToggle('男')}
          />
          <Button
            label="女子"
            colorScheme={genderToggle === '女' ? 'teal' : 'gray'}
            onClick={() => setGenderToggle('女')}
          />
        </HStack>
        <UniformManagementTable
          orders={genderToggle === '男' ? manData : womanData}
          genderToggle={genderToggle}
        />
        <Button
          w="95%"
          position="fixed"
          bottom="16px"
          left="50%"
          transform="translateX(-50%)"
          maxW="xl"
          label="スプレッドシードに転送"
          colorScheme="teal"
          shadow="base"
          onClick={onOpen}
          isLoading={loading}
        />
      </Stack>
      <ConfirmDialog
        title="書き込み"
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onClick={appendSpreadsheet}
      >
        <Text color="gray.400" px={8}>
          スプレッドシートのデータが上書きされますがよろしいですか?
        </Text>
      </ConfirmDialog>
    </>
  );
};

export default UnifomrManagementTableList;
