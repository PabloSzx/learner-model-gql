import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatSpanish } from "common";
import get from "lodash/get.js";
import { ReactNode, useCallback, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import {
  CellProps,
  Column,
  Row,
  TableState,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { proxy, useSnapshot } from "valtio";

export interface DataTableProps<Data extends object> {
  data: Data[];
  columns: Column<Data>[];
  hasNextPage?: Boolean;
  hasPreviousPage?: Boolean;
  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  isFetching?: Boolean;
  initialState?: Partial<TableState<Data>>;
}

const searchValue = proxy({
  current: "",
});

export function DataTable<Data extends object>({
  data,
  columns,
  hasNextPage,
  hasPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
  isFetching,
  initialState,
}: DataTableProps<Data>) {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
  } = useTable({ columns, data, initialState }, useGlobalFilter, useSortBy);

  const tableBg = useColorModeValue("blue.700", "blue.200");
  const tableColor = useColorModeValue("gray.50", "gray.800");

  const { current: searchValueString } = useSnapshot(searchValue);

  useEffect(() => {
    setGlobalFilter(searchValueString);
  }, [searchValueString]);

  const MapRow = useCallback(
    (row: Row<Data>) => {
      prepareRow(row);
      return (
        <Tr {...row.getRowProps()}>
          {row.cells.map((cell) => (
            <Td
              px={6}
              py={4}
              lineHeight="1.25rem"
              whiteSpace="nowrap"
              {...cell.getCellProps()}
            >
              {cell.render("Cell")}
            </Td>
          ))}
        </Tr>
      );
    },
    [prepareRow, rows]
  );

  return (
    <Box
      shadow="sm"
      rounded="lg"
      w={{ base: "92vw", lg: "full" }}
      overflow="auto"
    >
      <Flex alignItems="center" justifyContent="space-between" my={1}>
        <InputGroup maxW={{ md: "320px" }} w="full" mb={2}>
          <InputRightElement color="gray.400" pointerEvents="none">
            <BsSearch />
          </InputRightElement>
          <Input
            bg={tableColor}
            placeholder="Search"
            onChange={(ev) => (searchValue.current = ev.target.value)}
            value={searchValueString}
          />
        </InputGroup>

        {fetchNextPage && (
          <ButtonGroup variant="outline" size="sm">
            <Button
              as="a"
              rel="prev"
              onClick={fetchPreviousPage}
              isDisabled={!hasPreviousPage || !!isFetching}
            >
              Previous
            </Button>
            <Button
              as="a"
              rel="next"
              onClick={fetchNextPage}
              isDisabled={!hasNextPage || !!isFetching}
            >
              Next
            </Button>
          </ButtonGroup>
        )}
      </Flex>
      <>
        <Table
          width="full"
          height="full"
          variant="striped"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    px={6}
                    py={3}
                    borderBottomWidth="1px"
                    backgroundColor={tableBg}
                    textAlign="left"
                    fontSize="xs"
                    color={tableColor}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    lineHeight="1rem"
                    fontWeight="bold"
                    _first={{
                      roundedTopLeft: "lg",
                    }}
                    _last={{
                      roundedTopRight: "lg",
                    }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Flex alignItems="center">
                      {column.render("Header")}
                      <chakra.span pl={2}>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <Icon
                              as={GoTriangleDown}
                              aria-label="sorted descending"
                            />
                          ) : (
                            <Icon
                              as={GoTriangleUp}
                              aria-label="sorted ascending"
                            />
                          )
                        ) : null}
                      </chakra.span>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>{rows.map(MapRow)}</Tbody>
        </Table>
      </>

      <Flex alignItems="center" justifyContent="space-between" my={2}>
        <InputGroup maxW={{ md: "320px" }} w="full" mb={2}>
          <InputRightElement color="gray.400" pointerEvents="none">
            <BsSearch />
          </InputRightElement>
          <Input
            bg={tableColor}
            placeholder="Search"
            onChange={(ev) => (searchValue.current = ev.target.value)}
            value={searchValueString}
          />
        </InputGroup>

        {fetchNextPage && (
          <ButtonGroup variant="outline" size="sm">
            <Button
              as="a"
              rel="prev"
              onClick={fetchPreviousPage}
              isDisabled={!hasPreviousPage || !!isFetching}
            >
              Previous
            </Button>
            <Button
              as="a"
              rel="next"
              onClick={fetchNextPage}
              isDisabled={!hasNextPage || !!isFetching}
            >
              Next
            </Button>
          </ButtonGroup>
        )}
      </Flex>
    </Box>
  );
}

export const getDateRow = <
  T extends Record<string, any> = Record<string, any>
>({
  id,
  label,
  precell,
}: {
  id: string;
  label?: string;
  precell?: (V: T) => ReactNode;
}) => {
  return {
    id,
    Header: label,
    accessor: (value: T) => {
      const val = get(value, id);
      return val && formatSpanish(new Date(val), "PPPPpppp");
    },
    Cell: ({ row }: CellProps<T>) => {
      const value = get(row.original, id);
      return (
        <HStack>
          {precell?.(row.original) || null}
          <Text>{value ? formatSpanish(new Date(value), "PPpp O") : "-"}</Text>;
        </HStack>
      );
    },
    sortType: (rowA: Row<T>, rowB: Row<T>) => {
      const A = get(rowA.original, id) || new Date(0).toISOString();
      const B = get(rowB.original, id) || new Date(0).toISOString();
      if (A > B) return 1;
      return -1;
    },
  };
};
