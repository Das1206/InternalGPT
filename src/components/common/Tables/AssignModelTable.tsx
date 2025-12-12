/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { IconButton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import useAssignModelRemove from "../../../hooks/Models/useAssignModelRemove";
import { IModel } from "../../../hooks/Models/useAssignedModelList";
import Dialog from "../../Dialog";
interface AssignModelTableProps {
  data: IModel[];
  isDataLoading: boolean;
}

const AssignModelTable = ({ data, isDataLoading }: AssignModelTableProps) => {
  const { mutate: handelModelRemove, isPending } = useAssignModelRemove();
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState({
    isOpen: false,
    assignId: -1, 
  } as { isOpen: boolean , assignId?: number });
  const columns = useMemo<MRT_ColumnDef<IModel>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "username",
        header: "User/Dept Name",
        enableColumnActions: false,
        Cell: ({ cell }) =>
          cell.row.original?.username || cell?.row?.original?.department,
      },
      {
        accessorKey: "modelName",
        header: "Model",
        enableColumnActions: false,
      },

      {
        accessorKey: "remove",
        header: "Remove",
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell }) => {
          const row = cell.row.original;
          return (
            <IconButton
              disabled={isPending}
              sx={{ textTransform: "none" }}
              onClick={() =>
                setIsUnassignDialogOpen({
                  isOpen: true,
                  assignId: row.id, 
                })
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
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
        isOpen={isUnassignDialogOpen.isOpen}
        title="Unassign Model?"
        description={`You are about to unassign the model. Are you sure?`}
        confirmText="Yes, Unassign it!"
        isDanger={true}
        closeDialog={() => setIsUnassignDialogOpen({ isOpen: false })}
        onConfirm={() => {
          handelModelRemove({ assignId: isUnassignDialogOpen.assignId, });
          setIsUnassignDialogOpen({ isOpen: false });
        }}
      />
    </>
  );
};

export default AssignModelTable;
