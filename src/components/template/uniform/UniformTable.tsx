import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import type { VFC } from 'react';

import type { Order } from '@/models/users';

type Props = {
  orderList: Order[];
};

export const UniformTable: VFC<Props> = ({ orderList }) => (
  <Table variant="simple" size="sm">
    <Thead>
      <Tr>
        <Th>商品名</Th>
        <Th>サイズ</Th>
      </Tr>
    </Thead>
    <Tbody>
      {orderList &&
        orderList.map((item) =>
          item.size !== '' ? (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.size}</Td>
            </Tr>
          ) : (
            false
          )
        )}
    </Tbody>
  </Table>
);
