import 'react-datepicker/dist/react-datepicker.css';
import 'dayjs/locale/ja';

import {
  Box,
  Button as BasicButton,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { ConfirmDialog } from 'components/dialog';
import { Layout } from 'components/layout';
import { useAuth } from 'context/Auth';
import ja from 'date-fns/locale/ja';
import dayjs from 'dayjs';
import { User } from 'models/users';
import Router from 'next/router';
import React, { useRef, useState, VFC } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { FcCalendar } from 'react-icons/fc';
import { formatDate } from 'utils/format';

registerLocale('ja', ja);
dayjs.locale('ja');

export type RegistrationData = {
  type: string;
  record: string;
  tournamentName: string;
  date: Date;
};

const TestForm: VFC = () => {
  const toast = useToast();
  const cancelRef = useRef(null);
  const { user } = useAuth();
  const { add } = useCollection(`teams/Vwn4SWU3FsqSbqIU7mKy/test`);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string>('');
  const [furigana, setFurigana] = useState<string>('');
  const [romaji, setRomaji] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [rikukyo, setRikukyo] = useState<string>('');
  const [open, setOpen] = useState(false);

  const [type, setType] = useState<string>('');
  const [record, setRecord] = useState<string>('');
  const [tournamentName, setTournamentName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [registrationData, setRegistrationData] = useState<RegistrationData[]>(
    []
  );
  const [edit, setEdit] = useState(false);
  const [select, setSelect] = useState('');

  const { data: userData } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );

  const handleChange = (setState: any, e: any) => {
    setState(e.target.value);
  };

  const addData = () => {
    const data: RegistrationData = {
      type,
      record,
      tournamentName,
      date,
    };
    setRegistrationData((prev) => [...prev, data]);
    setType('');
    setRecord('');
    setTournamentName('');
    setDate(new Date());
    setOpen(false);
  };

  const editData = (selectIdx: number) => {
    const data = {
      type,
      record,
      tournamentName,
      date,
    };
    registrationData[selectIdx] = data;
    setRegistrationData([...registrationData]);
    setEdit(false);
  };
  const toggleEdit = (
    type: string,
    record: string,
    tournamentName: string,
    date: Date,
    selectIdx: string
  ) => {
    setType(type);
    setRecord(record);
    setTournamentName(tournamentName);
    setDate(date);
    setEdit(true);
    setSelect(selectIdx);
  };
  const deleteData = (selectIdx: number) => {
    const newData = registrationData.filter((_data, idx) => idx !== selectIdx);
    setRegistrationData([...newData]);
    setEdit(false);
  };

  const sendData = () => {
    const tournamentData = registrationData.map((data) => {
      return {
        ...data,
        date: formatDate(data.date),
      };
    });
    add({
      name,
      furigana,
      romaji,
      gender: userData?.gender,
      rikukyo,
      birthday,
      tournamentData,
    }).then(() => {
      toast({
        title: '送信完了',
        status: 'success',
        duration: 6000,
        isClosable: true,
      });
      Router.push('/');
    });
  };

  return (
    <Layout title="新潟県選エントリー">
      <Heading
        pt={10}
        pb={4}
        textAlign="center"
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="3xl"
      >
        新潟県選エントリー
      </Heading>
      <Container maxW="xl" py={8} align="center">
        <Stack spacing={4}>
          <Input
            placeholder="氏名（新潟太朗）"
            onChange={(e) => handleChange(setName, e)}
          />
          <Input
            placeholder="ふりがな（にいがたたろう）"
            onChange={(e) => handleChange(setFurigana, e)}
          />
          <Input
            placeholder="ローマ字（Taro Niigata ← 間は半角スペース）"
            onChange={(e) => handleChange(setRomaji, e)}
          />
          <Input
            placeholder="生年月日（1999.08.01）"
            onChange={(e) => handleChange(setBirthday, e)}
          />
          <Input
            placeholder="登録陸協"
            onChange={(e) => handleChange(setRikukyo, e)}
          />
          {registrationData.map((data, idx) => (
            <Box key={`${data.type}-${idx}`}>
              {edit && select === `${idx}` ? (
                <Stack align="start" mb={4}>
                  <Input
                    placeholder="種目"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <Input
                    placeholder="公認記録"
                    value={record}
                    onChange={(e) => setRecord(e.target.value)}
                  />
                  <Input
                    placeholder="大会名"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                  />
                  <HStack>
                    <Text color="gray.400">大会の日付</Text>
                    <ReactDatePicker
                      locale="ja"
                      selected={date}
                      onChange={(date: Date) => setDate(date)}
                      customInput={
                        <BasicButton
                          bg="gray.100"
                          border="2px solid"
                          borderColor="gray.300"
                          borderRadius="30px"
                          iconSpacing={4}
                          rightIcon={<Icon as={FcCalendar} w={6} h={6} />}
                        >
                          {formatDate(date)}
                        </BasicButton>
                      }
                    />
                  </HStack>
                  <HStack w="100%">
                    <Button
                      w="100%"
                      colorScheme="teal"
                      label="変更"
                      onClick={() => editData(idx)}
                    />
                    <Button
                      w="100%"
                      colorScheme="red"
                      label="削除"
                      onClick={() => deleteData(idx)}
                    />
                  </HStack>
                </Stack>
              ) : (
                <Card
                  fontSize="18px"
                  key={data.type}
                  align="center"
                  onClick={() =>
                    toggleEdit(
                      data.type,
                      data.record,
                      data.tournamentName,
                      data.date,
                      `${idx}`
                    )
                  }
                  cursor="pointer"
                >
                  <Heading size="lg">{data.tournamentName}</Heading>
                  <Text
                    color="gray.400"
                    mb={4}
                    borderBottom="1px solid #000"
                    pb={3}
                  >
                    {formatDate(data.date)}
                  </Text>
                  <HStack spacing={4} fontSize="20px" justify="center">
                    <Text>{data.type}</Text>
                    <Text>{data.record}</Text>
                  </HStack>
                </Card>
              )}
            </Box>
          ))}
          {open ? (
            <Stack spacing={4} align="start">
              <Input
                placeholder="種目"
                onChange={(e) => setType(e.target.value)}
              />
              <Input
                placeholder="公認記録"
                onChange={(e) => setRecord(e.target.value)}
              />
              <Input
                placeholder="大会名"
                onChange={(e) => setTournamentName(e.target.value)}
              />
              <HStack>
                <Text color="gray.400" pl={4}>
                  大会の日付
                </Text>
                <ReactDatePicker
                  locale="ja"
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  customInput={
                    <BasicButton
                      bg="gray.100"
                      border="2px solid"
                      borderColor="gray.300"
                      borderRadius="30px"
                      iconSpacing={4}
                      rightIcon={<Icon as={FcCalendar} w={6} h={6} />}
                    >
                      {formatDate(date)}
                    </BasicButton>
                  }
                />
              </HStack>
              <Button colorScheme="teal" label="追加" onClick={addData} />
            </Stack>
          ) : (
            <Button label="＋" onClick={() => setOpen(true)} />
          )}
          {registrationData.length > 0 && (
            <Button
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              color="white"
              label="確認へ"
              onClick={onOpen}
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
            />
          )}
        </Stack>
        <ConfirmDialog
          title=""
          isOpen={isOpen}
          cancelRef={cancelRef}
          onClose={onClose}
          onClick={sendData}
        >
          <Stack pl={4}>
            <Text>氏名：{name}</Text>
            <Text>ふりがな：{furigana}</Text>
            <Text>ローマ字：{romaji}</Text>
            <Text>生年月日：{birthday}</Text>
            <Text mb={2}>登録陸協：{rikukyo}</Text>
            <Divider mb={2} />
            <SimpleGrid row={2}>
              {registrationData.map((data, idx) => (
                <Box key={`${data.type}-${idx}`} mb={4}>
                  <Text>{`種目 : ${data.type}`}</Text>
                  <Text>{`公認記録 : ${data.record}`}</Text>
                  <Text>{`大会名 : ${data.tournamentName}`}</Text>
                  <Text>{`大会の日付 : ${formatDate(data.date)}`}</Text>
                  <Divider mt={4} />
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </ConfirmDialog>
      </Container>
    </Layout>
  );
};

export default TestForm;
