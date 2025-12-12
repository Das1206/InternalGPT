import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button, IconButton } from "@mui/material";
import useChatStore from "../../../store/ChatStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../constants";
import { IModel } from "../../../hooks/Models/useModelsList";
import useDeleteModelById from "../../../hooks/Models/useDeleteModelById";
import Dialog from "../../Dialog";

interface ModelsTableProps {
  data: IModel[];
  isDataLoading: boolean;
  setModel: (model: IModel) => void;
}

const ModelsTable = ({ data, setModel, isDataLoading }: ModelsTableProps) => {
  const { mutate: DeleteModelById, isPending } = useDeleteModelById();
  const changeModelID = useChatStore((s) => s.setModelId);
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState({
    isOpen: false,
    id: -1
  } as { isOpen: boolean, id?: number });
  const columns = useMemo<MRT_ColumnDef<IModel>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableSorting: false,
        enableColumnActions: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableColumnActions: false,
        grow: true,
      },
      {
        accessorKey: "edit",
        header: "Actions",
        enableSorting: false,
        enableColumnActions: false,

        Cell: ({ cell }) => {
          const row = cell.row.original;
          return (
            <div className="flex gap-4">
              <IconButton
                title="Edit Model"
                onClick={() => {
                  setModel(row);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
              </IconButton>
              <IconButton
                title="Delete Model"
                onClick={() => setIsDeleteDialogOpen({ isOpen: true, id: row?.id })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </IconButton>
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                onClick={() => {
                  changeModelID(cell?.row?.original?.id);
                  navigate("/app/" + Routes.CHATS);
                }}
              >
                Use Model
              </Button>
            </div>
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
        title="Delete Model?"
        description={`You are about to delete the model. Are you sure?`}
        confirmText="Yes, Delete it!"
        isDanger={true}
        closeDialog={() => setIsDeleteDialogOpen({ isOpen: false })}
        onConfirm={() => {
          DeleteModelById(isDeleteDialogOpen.id);
          setIsDeleteDialogOpen({ isOpen: false });
        }}
      />
    </>
  );
};

export default ModelsTable;
