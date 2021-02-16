/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Document } from '@nandorojo/swr-firestore';
import type { Vote } from 'models/users';
import React, { useMemo, VFC } from 'react';
import { Column, useSortBy, useTable } from 'react-table';

type Props = {
  votes: Document<Vote>[];
};

type TableData = {
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  gender: '男' | '女';
  name: string;
};

const VoteTable: VFC<Props> = ({ votes }) => {
  const DATA: TableData[] = votes.map((vote) => {
    return {
      grade: vote.grade,
      gender: vote.gender,
      name: vote.name,
    };
  });

  const COLUMNS: Column<TableData>[] = [
    {
      Header: '学年',
      accessor: 'grade',
    },
    {
      Header: '性別',
      accessor: 'gender',
    },
    {
      Header: '氏名',
      accessor: 'name',
    },
  ];

  const data = useMemo(() => DATA, []);
  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable<TableData>({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    allColumns,
    headerGroups,
    rows,
  } = tableInstance;

  return (
    <>
      <Stack direction="row" spacing={4} mb={4}>
        {allColumns.map((column) => {
          if (column.id !== 'name') {
            return (
              <Checkbox
                defaultChecked
                key={column.id}
                {...column.getToggleHiddenProps()}
              >
                {column.Header}
              </Checkbox>
            );
          }
        })}
      </Stack>
      <Table {...getTableProps()} variant="simple" shadow="base" size="sm">
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
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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
    </>
  );
};

export default VoteTable;
