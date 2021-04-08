import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  maleCount: number;
  femaleCount: number;
};

const EntryConutTable: VFC<Props> = ({ maleCount, femaleCount }) => (
  <Table variant="simple" maxW="sm">
    <Thead>
      <Tr textAlign="center">
        <Th>男子</Th>
        <Th>女子</Th>
        <Th>合計</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td textAlign="center">{`${maleCount}`}</Td>
        <Td textAlign="center">{`${femaleCount}`}</Td>
        <Td textAlign="center">{`${maleCount + femaleCount}`}</Td>
      </Tr>
    </Tbody>
  </Table>
);

export default EntryConutTable;
