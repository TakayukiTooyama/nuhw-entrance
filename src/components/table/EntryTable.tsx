/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import type { VFC } from 'react';
import { useMemo } from 'react';
import type { Column } from 'react-table';
import { useSortBy, useTable } from 'react-table';

import type { Entry } from '@/models/users';
import type { Event } from '@/models/users';

type Props = {
  entries: Omit<Entry, 'timeLimit'>[];
};

type TableData = {
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  name: string;
  hurigana: string;
  event: Event;
  entryRecord: string;
};

export const EntryTable: VFC<Props> = ({ entries }) => {
  const tableData = () => {
    const tableData: TableData[] = [];
    entries.forEach((data) => {
      data.eventsInfo.forEach((event) => {
        tableData.push({
          name: data.name,
          hurigana: data.furigana,
          grade: data.grade,
          event: event.name,
          entryRecord: event.entryRecord,
        });
      });
    });
    return tableData;
  };

  const DATA: TableData[] = [...tableData()];

  const COLUMNS: Column<TableData>[] = [
    {
      Header: '学年',
      accessor: 'grade',
    },
    {
      Header: '氏名',
      accessor: 'name',
    },
    {
      Header: 'フリガナ',
      accessor: 'hurigana',
    },
    {
      Header: '出場種目',
      accessor: 'event',
    },
    {
      Header: '参加記録',
      accessor: 'entryRecord',
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
      <Flex
        direction="row"
        justify="flex-start"
        wrap="wrap"
        w="100%"
        maxW="384px"
        mb={4}
        mr="auto"
      >
        {allColumns.map((column) => {
          if (column.id !== 'name') {
            return (
              <Checkbox
                defaultChecked
                key={column.id}
                {...column.getToggleHiddenProps()}
                mr={4}
              >
                {column.Header}
              </Checkbox>
            );
          }
        })}
      </Flex>
      <Table
        variant="simple"
        shadow="base"
        size="sm"
        maxW="640px"
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
