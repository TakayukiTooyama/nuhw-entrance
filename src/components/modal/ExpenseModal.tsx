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
import { Expense } from 'models/users';
import React, { VFC } from 'react';
import { formatPriceNotation, formatWeekdayNotation } from 'utils/format';

type Props = {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
};

const ExpenseModal: VFC<Props> = ({ isOpen, onClose, expense }) => {
  const priceArray = expense.eventsInfo.map((data) => {
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
            startDate={formatWeekdayNotation(expense.startDate)}
            endDate={formatWeekdayNotation(expense.endDate)}
          />
          <Heading as="h2" size="lg" mb={4}>
            {expense.tournamentName}
          </Heading>
          <Divider />
        </Box>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4} py={4} justify="center" fontSize="20px">
            <Text>{expense.grade}</Text>
            <Text>/</Text>
            <Text>{expense.name}</Text>
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
              {expense.eventsInfo.map((data) => {
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
