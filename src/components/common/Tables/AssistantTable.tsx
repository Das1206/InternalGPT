import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { IAssistant } from "../../../hooks/Assistants/useAssistantList";
import { Button, IconButton } from "@mui/material";
import { IAssistantObject } from "../../modal/CreateAssistantModal";
import useDeleteAssistantById from "../../../hooks/Assistants/useDeleteAssistantById";
import useChatStore from "../../../store/ChatStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../constants";
import Dialog from "../../Dialog";

interface AssistantTableProps {
  data: IAssistant[];
  setAssistant: (assistant: IAssistantObject) => void;
  isDataLoading: boolean;
}

const AssistantTable = ({
  data,
  isDataLoading,
  setAssistant,
}: AssistantTableProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState({
    isOpen: false,
    id: -1
  } as { isOpen: boolean, id?: number });
  const { mutate: DeleteAssistantById, isPending } = useDeleteAssistantById();
  const changeAssistantID = useChatStore((s) => s.setAssistantId);
  const changeChatID = useChatStore((s) => s.setChatId);
  const navigate = useNavigate();
  const columns = useMemo<MRT_ColumnDef<IAssistant>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Name",
        enableColumnActions: false,
      },
      {
        accessorKey: "action",
        header: "Use Assistant",
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ cell }) => (
          <Button
            size={"small"}
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={() => {
              changeAssistantID(cell?.row?.original?.id);
              changeChatID(undefined);
              navigate("/app/" + Routes.CHATS);
            }}
          >
            Use Assistant
          </Button>
        ),
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
                onClick={() =>
                  setAssistant({
                    id: row?.id,
                    assistantId: row?.assistantId || "",
                    name: row?.name,
                    description: row?.description,
                  })

                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
              </IconButton>{" "}
              <IconButton
                sx={{ textTransform: "none" }}
                onClick={() => setIsDeleteDialogOpen({ isOpen: true, id: row?.id })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
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
        title="Delete Assistant?"
        description={`You are about to delete the assistant. Are you sure?`}
        confirmText="Yes, Delete it!"
        isDanger={true}
        closeDialog={() => setIsDeleteDialogOpen({ isOpen: false })}
        onConfirm={() => {
          DeleteAssistantById(isDeleteDialogOpen.id);
          setIsDeleteDialogOpen({ isOpen: false });
        }}
      />
    </>
  );
};

export default AssistantTable;
