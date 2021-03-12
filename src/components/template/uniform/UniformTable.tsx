import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import type { Order } from 'models/users';
import React, { VFC } from 'react';

type Props = {
  orderList: Order[];
};

const UniformTable: VFC<Props> = ({ orderList }) => {
  return (
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
            return item.size !== '' ? (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.size}</Td>
              </Tr>
            ) : (
              false
            );
          })}
      </Tbody>
    </Table>
  );
};

export default UniformTable;
