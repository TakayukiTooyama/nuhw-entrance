import {
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import Router from 'next/router';
import type { VFC } from 'react';
import { useRef, useState } from 'react';

import { Button } from '@/components/button';
import { ConfirmDialog } from '@/components/dialog';
import {
  FemaleUniformManagementTable,
  MaleUniformManagementTable,
} from '@/components/template/uniform';
import type { UniformInfo } from '@/models/users';

type Props = {
  orders: Document<UniformInfo>[];
};

export const UniformManagementTableList: VFC<Props> = ({ orders }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [genderToggle, setGenderToggle] = useState<'男' | '女'>('男');
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef();

  const maleData = orders.filter((data) => data.gender === '男');
  const femaleData = orders.filter((data) => data.gender === '女');

  const appendSpreadsheet = async () => {
    setIsLoading(true);
    try {
      const manTableAppendData = maleData.map((info) => {
        const sizeData = info.order.flatMap((data) => data.size);
        return [info.name, ...sizeData, info.orderDate];
      });
      const womanTableAppendData = femaleData.map((info) => {
        const sizeData = info.order.flatMap((data) => data.size);
        return [info.name, ...sizeData, info.orderDate];
      });
      const manTableResponse = await fetch(
        'https://v1.nocodeapi.com/nuhw/google_sheets/cKUJNmTTbvFQpevn?tabId=男子',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(manTableAppendData),
        }
      );

      const wonmanTableResponse = await fetch(
        'https://v1.nocodeapi.com/nuhw/google_sheets/cKUJNmTTbvFQpevn?tabId=女子',
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading as="h1" size="lg" mb={12}>
        {orders[0].title}
      </Heading>
      <Stack spacing={8} width="100%">
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
        {genderToggle === '男' ? (
          <MaleUniformManagementTable
            orders={maleData}
            genderToggle={genderToggle}
          />
        ) : (
          <FemaleUniformManagementTable
            orders={femaleData}
            genderToggle={genderToggle}
          />
        )}
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
          isLoading={isLoading}
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
