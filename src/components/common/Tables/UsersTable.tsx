import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { IconButton } from "@mui/material";
import { IUser } from "../../../hooks/User/useUsersList";
import useDeleteUserById from "../../../hooks/User/useDeleteUserById";
import Capitalize from "../../Utils/Capitalize";
import { IUserPost } from "../../../hooks/User/useUserUpdate";
import Dialog from "../../Dialog";
interface UsersTableProps {
  data: IUser[];
  setUser: (user: IUserPost) => void;
  isDataLoading: boolean;
}
const UsersTable = ({ data, setUser, isDataLoading }: UsersTableProps) => {
  const { mutate: DeleteUserById, isPending } = useDeleteUserById();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState({
    isOpen: false,
    id: -1
  } as { isOpen: boolean, id?: number });
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
        enableColumnActions: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
        enableColumnActions: false,
      },
      {
        accessorKey: "role",
        header: "Type",
        size: 150,
        enableColumnActions: false,
        Cell: ({ cell }) => <>{Capitalize(cell?.getValue() as string)}</>,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 150,
        enableColumnActions: false,
        Cell: ({ cell }) => <>{Capitalize(cell?.getValue() as string)}</>,
      },
      {
        accessorKey: "noOfChats",
        header: "No of Chats",
        size: 150,
        enableColumnActions: false,
        Cell: ({ cell }) => <>{Capitalize(cell?.getValue() as string)}</>,
      },
      {
        accessorKey: "createdModels",
        header: "Created Models",
        size: 50,
        enableColumnActions: false,
        Cell: ({ cell }) => <>{Capitalize(cell?.getValue() as string)}</>,
      },
      {
        accessorKey: "assignCount",
        header: "Assign Models",
        size: 50,
        enableColumnActions: false,
        Cell: ({ cell }) => <>{Capitalize(cell?.getValue() as string)}</>,
      },
      {
        accessorFn: (originalRow) => {
          const createdAt = originalRow.createdAt;
          return createdAt ? new Date(createdAt) : null;
        },
        id: "createdAt",
        header: "Created At",
        filterVariant: "date-range",
        enableColumnActions: false,
        hidden: true,
        Cell: ({ cell }) => {
          const originalCreatedAt = cell.row?.original?.createdAt;
          if (originalCreatedAt) {
            const cellValue = new Date(originalCreatedAt);
            return cellValue.toLocaleDateString();
          }
          return ""; // Handle the case where createdAt is undefined
        },
      },
      {
        accessorKey: "edit",
        header: "Actions",
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell }) => {
          const row = cell.row.original;
          return (
            <>
              <IconButton
                sx={{ textTransform: "none" }}
                onClick={() => {
                  setUser({
                    id: row?.id,
                    department: row?.department || "",
                    name: row?.name,
                  });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              </IconButton>{" "}
              <IconButton
                sx={{ textTransform: "none" }}
                onClick={() => setIsDeleteDialogOpen({ isOpen: true, id: row?.id })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </IconButton>
            </>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
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
  // Create a new row with the total value
  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        isOpen={isDeleteDialogOpen.isOpen}
        title="Delete User?"
        description={`You are about to delete the user. Are you sure?`}
        confirmText="Yes, Delete it!"
        isDanger={true}
        closeDialog={() => setIsDeleteDialogOpen({ isOpen: false })}
        onConfirm={() => {
          DeleteUserById(isDeleteDialogOpen.id);
          setIsDeleteDialogOpen({ isOpen: false });
        }}
      />
    </>
  );
};

export default UsersTable;
