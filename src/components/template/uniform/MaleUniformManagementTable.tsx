/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import type { Document } from '@nandorojo/swr-firestore';
import type { VFC } from 'react';
import { useMemo } from 'react';
import type { Column } from 'react-table';
import { useSortBy, useTable } from 'react-table';

import type { UniformInfo } from '@/models/users';

type Props = {
  orders: Document<UniformInfo>[];
  genderToggle: '男' | '女';
};

type TableData = {
  name: string;
  windBreakerUp: string;
  windBreakerDown: string;
  jerseyUp: string;
  jerseyDown: string;
  runningShirt: string;
  runningPants: string;
  whiteTights: string;
  halfPants: string;
  poloShirt: string;
  navyPinkTshirt: string;
  lightBlueTshirt: string;
};

export const MaleUniformManagementTable: VFC<Props> = ({
  orders,
  genderToggle,
}) => {
  const DATA = orders.map((data) => {
    return {
      name: data.name,
      windBreakerUp: data.order[0].size,
      windBreakerDown: data.order[1].size,
      jerseyUp: data.order[2].size,
      jerseyDown: data.order[3].size,
      runningShirt: data.order[4].size,
      runningPants: data.order[5].size,
      whiteTights: data.order[6].size,
      halfPants: data.order[7].size,
      poloShirt: data.order[8].size,
      navyPinkTshirt: data.order[9].size,
      lightBlueTshirt: data.order[10].size,
    };
  });

  const COLUMNS: Column<TableData>[] = [
    { Header: '氏名', accessor: 'name' },
    { Header: 'WB上', accessor: 'windBreakerUp' },
    { Header: 'WB下', accessor: 'windBreakerDown' },
    { Header: 'ジャージ上', accessor: 'jerseyUp' },
    { Header: 'ジャージ下', accessor: 'jerseyDown' },
    { Header: 'ランシャツ', accessor: 'runningShirt' },
    { Header: 'ランパン', accessor: 'runningPants' },
    { Header: 'タイツ(白)', accessor: 'whiteTights' },
    { Header: 'ハーフパンツ', accessor: 'halfPants' },
    { Header: 'ポロシャツ', accessor: 'poloShirt' },
    { Header: '紺ピンクT', accessor: 'navyPinkTshirt' },
    { Header: '水色T', accessor: 'lightBlueTshirt' },
  ];

  const data = useMemo(() => DATA, [genderToggle]);
  const columns = useMemo(() => COLUMNS, [genderToggle]);
  const tableInstance = useTable<TableData>({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;

  return (
    <Table
      variant="simple"
      shadow="base"
      size="sm"
      display="block"
      overflowX="scroll"
      whiteSpace="nowrap"
      {...getTableProps()}
    >
      <Thead bg="gray.200">
        {headerGroups.map((headerGroup) => (
          <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                key={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td key={`${row.id}-${cell.value}`} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
