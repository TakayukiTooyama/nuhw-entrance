import {
  Box,
  Divider,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CardTextSchedule } from 'components/text';
import { Entry } from 'models/users';
import React, { VFC } from 'react';
import { formatPriceNotation, formatWeekdayNotation } from 'utils/format';

type Props = {
  entry: Entry;
  isOpen: boolean;
  onClose: () => void;
};

const ExpenseModal: VFC<Props> = ({ isOpen, onClose, entry }) => {
  const priceArray = entry.eventsInfo.map((data) => {
    return data.expense;
  });
  const totalPrice = priceArray.reduce((acc, cur) => acc + cur);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent pt={8} pb={12} w="95%">
        <Box px={6}>
          <CardTextSchedule
            color="gray.400"
            startDate={formatWeekdayNotation(entry.startDate)}
            endDate={formatWeekdayNotation(entry.endDate)}
          />
          <Heading as="h2" size="lg" mb={4}>
            {entry.tournamentName}
          </Heading>
          <Divider />
        </Box>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4} py={4} justify="center" fontSize="20px">
            <Text>{entry.grade}</Text>
            <Text>/</Text>
            <Text>{entry.name}</Text>
          </HStack>
          <Table
            variant="simple"
            size="md"
            shadow="base"
            borderColor="gray.200"
          >
            <Thead bg="gray.200">
              <Tr>
                <Th>出場種目</Th>
                <Th isNumeric>エントリー費</Th>
              </Tr>
            </Thead>
            <Tbody>
              {entry.eventsInfo.map((data) => {
                return (
                  <Tr key={data.name}>
                    <Td>{data.name}</Td>
                    <Td isNumeric>{formatPriceNotation(data.expense)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot bg="gray.200">
              <Tr>
                <Th>合計</Th>
                <Th isNumeric fontSize="20px">
                  {formatPriceNotation(totalPrice)}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseModal;
