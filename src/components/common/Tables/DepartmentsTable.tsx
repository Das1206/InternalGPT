import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { IconButton } from "@mui/material";
import Dialog from "../../Dialog";
import { IDepartment } from "../../../hooks/departments/useDepartmentList";
import useDeleteDepartmentById from "../../../hooks/departments/useDeleteDepartmentById";

interface DepartmentsTableProps {
  data: IDepartment[];
  isDataLoading: boolean;
}

const DepartmentsTable = ({ data, isDataLoading }: DepartmentsTableProps) => {
  const { mutate: DeleteDeptById, isPending } = useDeleteDepartmentById();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState({
    isOpen: false,
    id: -1
  } as { isOpen: boolean, id?: number });
  const columns = useMemo<MRT_ColumnDef<IDepartment>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "title",
        header: "Title",
        enableColumnActions: false,
      },
      {
        accessorKey: "userCount",
        header: "No of Users",
        enableColumnActions: false,
      },
      {
        accessorKey: "delete",
        header: "Delete",
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell }) => {
          const row = cell.row.original;
          return (
            <IconButton
              sx={{ textTransform: "none" }}
              onClick={() => setIsDeleteDialogOpen({ isOpen: true, id: row.id })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </IconButton>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: isPending || isDataLoading,
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

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        isOpen={isDeleteDialogOpen.isOpen}
        title="Delete Department?"
        description={`You are about to delete the department. Are you sure?`}
        isDanger={true}
        confirmText="Yes, Delete it!"
        closeDialog={() => setIsDeleteDialogOpen({ isOpen: false })}
        onConfirm={() => {
          DeleteDeptById(isDeleteDialogOpen.id);
          setIsDeleteDialogOpen({ isOpen: false });
        }}
      />
    </>
  );
};

export default DepartmentsTable;
