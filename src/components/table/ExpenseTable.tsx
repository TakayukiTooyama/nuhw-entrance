/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import type { Entry } from 'models/users';
import React, { useMemo, VFC } from 'react';
import {
  CellProps,
  Column,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { formatPriceNotation } from 'utils/format';

type Props = {
  entries: Omit<Entry, 'timeLimit'>[];
};

type TableData = {
  gender: '男' | '女';
  name: string;
  expense: string;
};

const ExpenseTable: VFC<Props> = ({ entries }) => {
  const DATA: TableData[] = entries.map((data) => {
    return {
      gender: data.gender,
      name: data.name,
      expense: formatPriceNotation(data.totalExpenses),
    };
  });

  const COLUMNS: Column<TableData>[] = [
    {
      Header: '性別',
      accessor: 'gender',
    },
    {
      Header: '氏名',
      accessor: 'name',
    },
    {
      Header: '総費',
      accessor: 'expense',
    },
  ];

  const data = useMemo(() => DATA, []);
  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable<TableData>(
    { columns, data },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: () => <Text>確認済</Text>,
            Cell: (props: CellProps<TableData>) => (
              <Checkbox {...props.row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    // selectedFlatRows,
    allColumns,
    headerGroups,
    rows,
  } = tableInstance;

  return (
    <>
      <Stack direction="row" spacing={4} mb={4}>
        {allColumns.map((column) => {
          if (column.id === 'gender' || column.id === 'expense') {
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
            return row.isSelected ? (
              <Tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td key={`${row.id}-${cell.value}`} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            ) : (
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

export default ExpenseTable;
