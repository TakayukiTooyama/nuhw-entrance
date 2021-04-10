import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { VFC } from 'react';

type Props = {
  maleCount: number;
  femaleCount: number;
};

const EntryCountTable: VFC<Props> = ({ maleCount, femaleCount }) => (
  <Table variant="simple" maxW="sm">
    <Thead>
      <Tr>
        <Th textAlign="center">男子</Th>
        <Th textAlign="center">女子</Th>
        <Th textAlign="center">合計</Th>
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

export default EntryCountTable;
