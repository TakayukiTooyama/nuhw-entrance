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
import ja from 'date-fns/locale/ja';
import dayjs from 'dayjs';
import Router from 'next/router';
import type { VFC } from 'react';
import { useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { FcCalendar } from 'react-icons/fc';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ConfirmDialog } from '@/components/dialog';
import { Layout } from '@/components/layout';
import { useAuth } from '@/context/Auth';
import type { User } from '@/models/users';
import { formatDate } from '@/utils/format';

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
  const [isField, setIsField] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [type, setType] = useState<string>('');
  const [record, setRecord] = useState<string>('');
  const [tournamentName, setTournamentName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [registrationData, setRegistrationData] = useState<RegistrationData[]>(
    []
  );
  const [isEdit, setIsEdit] = useState(false);
  const [select, setSelect] = useState('');

  const { data: userData } = useDocument<User>(
    user ? `users/${user.uid}` : null
  );

  const handleChange = (setState: any, e: any) => {
    setState(e.target.value);
  };

  const addData = () => {
    if (formatDate(date) === formatDate(new Date())) {
      setErrorMessage('大会日を変更してください');
      return;
    } else {
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
      setIsField(false);
    }
  };

  const editData = (selectIdx: number) => {
    if (formatDate(date) === formatDate(new Date())) {
      setErrorMessage('大会日を変更してください');
      return;
    }
    const data = {
      type,
      record,
      tournamentName,
      date,
    };
    registrationData[selectIdx] = data;
    setRegistrationData([...registrationData]);
    setIsEdit(false);
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
    setIsEdit(true);
    setSelect(selectIdx);
  };
  const deleteData = (selectIdx: number) => {
    const newData = registrationData.filter((_data, idx) => idx !== selectIdx);
    setRegistrationData([...newData]);
    setIsEdit(false);
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

  const dateOnChange = (date: Date) => {
    setDate(date);
    setErrorMessage('');
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
            placeholder="登録陸協（新潟）"
            onChange={(e) => handleChange(setRikukyo, e)}
          />
          {registrationData.map((data, idx) => (
            <Box key={`${data.type}-${idx}`}>
              {isEdit && select === `${idx}` ? (
                <Stack align="center" mb={4}>
                  <Input
                    placeholder="種目（100m）"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <Input
                    placeholder="公認記録（2年間有効）"
                    value={record}
                    onChange={(e) => setRecord(e.target.value)}
                  />
                  <Input
                    placeholder="記録を出した大会名（正式名所）"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                  />
                  <HStack>
                    <Text color="gray.400">上記の大会日</Text>
                    <ReactDatePicker
                      locale="ja"
                      selected={date}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      maxDate={new Date()}
                      dropdownMode="select"
                      onChange={dateOnChange}
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
                  {errorMessage && <Text color="red.400">{errorMessage}</Text>}
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
          {isField ? (
            <Stack spacing={4} align="center">
              <Input
                placeholder="種目（100m）"
                onChange={(e) => setType(e.target.value)}
              />
              <Input
                placeholder="公認記録（2年間有効）"
                onChange={(e) => setRecord(e.target.value)}
              />
              <Input
                placeholder="記録を出した大会名（正式名所）"
                onChange={(e) => setTournamentName(e.target.value)}
              />
              <HStack>
                <Text color="gray.400" pl={4}>
                  上記の大会日
                </Text>
                <ReactDatePicker
                  locale="ja"
                  selected={date}
                  onChange={dateOnChange}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  maxDate={new Date()}
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
              {errorMessage && <Text color="red.400">{errorMessage}</Text>}
              <Button colorScheme="teal" label="追加" onClick={addData} />
            </Stack>
          ) : (
            !isEdit && <Button label="＋" onClick={() => setIsField(true)} />
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
                  <Text>{`大会日 : ${formatDate(data.date)}`}</Text>
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
