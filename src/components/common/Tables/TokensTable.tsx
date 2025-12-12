import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { IHistory } from "../../../hooks/TokenHistory/useTokenHistory";
import { Box, Typography } from "@mui/material";

interface TokensTableProps {
  data: IHistory[];
  isDataLoading: boolean;
}
const TokensTable = ({ data, isDataLoading }: TokensTableProps) => {
  const columns = useMemo<MRT_ColumnDef<IHistory>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        enableColumnActions: false,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 150,
        enableColumnActions: false,
      },
      // {
      //   accessorKey: "query",
      //   header: "Query",
      //   size: 150,
      //   enableColumnActions: false,
      // },
      {
        accessorKey: "tokens",
        header: "Word Count",
        size: 150,
        enableColumnActions: false,
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.createdAt), //convert to date for sorting and filtering
        id: "createdAt",
        header: "Created At",
        filterVariant: "date-range",
        enableColumnActions: false,
        Cell: ({ cell }) => {
          const cellValue = new Date(cell.row?.original?.createdAt);
          return cellValue.toLocaleDateString();
        },
      },
      // {
      //   accessorKey: "createdAt",
      //   header: "Created At",
      //   size: 150,
      //   Cell: ({ cell }) => FormatDate({ date: cell?.getValue() as Date }),
      // },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    state: {
      isLoading: isDataLoading,
    },
    initialState: {
      columnVisibility: {
        id: false,
      }
    },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
  });
  const filteredRows = table.getFilteredRowModel().rows;
  const totalTokens = filteredRows.reduce(
    (acc, row) => acc + row.original.tokens,
    0
  );

  // Create a new row with the total value
  return (
    <Box>
      <Typography mt={"20px"} textAlign={"end"}>
        <span style={{ fontWeight: "bold" }}>Total Words: </span>
        {totalTokens}
      </Typography>

      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TokensTable;
