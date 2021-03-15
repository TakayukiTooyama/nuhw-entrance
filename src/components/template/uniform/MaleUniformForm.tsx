/* eslint-disable no-irregular-whitespace */
import {
  Box,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCollection } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { ConfirmDialog } from 'components/dialog';
import { FormHeading } from 'components/heading';
import { FormSelect } from 'components/input';
import { useAuth } from 'context/Auth';
import {
  Order,
  OrderSize,
  UniformFormInput,
  UniformInfo,
  UserInfo,
} from 'models/users';
import Image from 'next/image';
import Router from 'next/router';
import React, { useRef, useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import { maleUniformData } from 'utils/data';
import { FirebaseTimestamp } from 'utils/firebase';
import { formatDate } from 'utils/format';
import { sizeOptions } from 'utils/selectOptions';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .matches(/^[ぁ-んァ-ンヴー-龥(\s|　)]+$/, '全角で入力してください。')
      .required('名字を入力してください。'),
    lastName: yup
      .string()
      .matches(/^[ぁ-んァ-ンヴー-龥(\s|　)]+$/, '全角で入力してください。')
      .required(' 名前を入力してください。'),
  })
  .defined();

const defaultValues: Omit<
  UniformFormInput,
  'separateTop' | 'separateShorts' | 'navyPinkTights'
> = {
  windBreakerUp: '選択',
  windBreakerDown: '選択',
  jerseyUp: '選択',
  jerseyDown: '選択',
  runningShirt: '選択',
  runningPants: '選択',
  whiteTights: '選択',
  halfPants: '選択',
  poloShirt: '選択',
  navyPinkTshirt: '選択',
  lightBlueTshirt: '選択',
};

type OrderItem = {
  name: string;
  size: OrderSize;
};

type Props = {
  title: string;
  userInfo: UserInfo;
};

const MaleUniformForm: VFC<Props> = ({ title, userInfo }) => {
  const { user } = useAuth();
  const { add } = useCollection(`users/${user?.uid}/orders`);

  const { handleSubmit, control, getValues } = useForm<
    Omit<UniformFormInput, 'separateTop' | 'separateShorts' | 'navyPinkTights'>
  >({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef();

  const [orderList, setOrderList] = useState<OrderItem[]>(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  const confirm = () => {
    const inputData = getValues();
    const newOrderList: OrderItem[] = maleUniformData.map((data) => {
      const selectKey = Object.keys(inputData).filter(
        (key) => key === data.id
      )[0];
      return {
        name: data.name,
        size: inputData[selectKey],
      };
    });
    setOrderList(newOrderList);

    const existsSize =
      Object.values(inputData).filter((value) => value !== '選択').length > 0;
    existsSize
      ? onOpen()
      : setErrorMessage('1つ以上商品を選択してから注文してください。');
  };

  const addOrder = () => {
    const orderInfo: Order[] = orderList.map((item, idx) => {
      return {
        id: idx + 2,
        name: item.name,
        size: item.size === '選択' ? '' : item.size,
      };
    });

    const uniformInfo: UniformInfo = {
      title,
      name: userInfo?.name,
      gender: userInfo?.gender,
      order: [...orderInfo],
      orderDate: formatDate(new Date()),
      addedAt: FirebaseTimestamp.now(),
    };
    add(uniformInfo).then(() => {
      Router.push('/uniform');
      toast({
        title: '注文完了.',
        description: 'ご注文ありがとうございます。集金は届き次第行います。',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <FormHeading title={title} />
      <form onSubmit={handleSubmit(confirm)}>
        <Stack spacing={8}>
          {maleUniformData.map((item) => (
            <Flex direction={['column', 'row']} key={item.name} shadow="base">
              <Box w={['100%', '40%']}>
                <Image
                  src={item.image}
                  layout="responsive"
                  objectFit="cover"
                  width="100%"
                  height="auto"
                />
              </Box>
              <Flex
                direction="column"
                bg="white"
                justify="center"
                w={['100%', '60%']}
                px={[4, 8]}
                py={4}
              >
                <FormSelect
                  name={item.id}
                  label={item.name}
                  selectOptions={sizeOptions}
                  control={control}
                  onClick={() => setErrorMessage('')}
                  size="sm"
                />
              </Flex>
            </Flex>
          ))}
          <Stack align="center">
            <Button label="確認画面へ" colorScheme="teal" onClick={confirm} />
            {errorMessage && (
              <Text color="red.300" fontWeight="bold">
                {errorMessage}
              </Text>
            )}
          </Stack>
        </Stack>
      </form>
      <ConfirmDialog
        title="発注"
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onClick={addOrder}
      >
        <Text fontSize="18px" align="center" mb={4}>
          {userInfo.name}
        </Text>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>商品名</Th>
              <Th>サイズ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderList &&
              orderList.map((item) => {
                return item.size !== '選択' ? (
                  <Tr key={item.name}>
                    <Td>{item.name}</Td>
                    <Td>{item.size}</Td>
                  </Tr>
                ) : (
                  false
                );
              })}
          </Tbody>
        </Table>
      </ConfirmDialog>
    </>
  );
};

export default MaleUniformForm;
