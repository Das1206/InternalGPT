import { IoMdAddCircle } from "react-icons/io";
import useAssistantList from "../../hooks/Assistants/useAssistantList";
import { Button, Container } from "@mui/material";
import AssistantTable from "../../components/common/Tables/AssistantTable";
import { useState } from "react";
import CreateAssistantModal, {
  IAssistantObject,
} from "../../components/modal/CreateAssistantModal";
import AssistantAssignModal from "../../components/modal/AssistantAssignModal";
import { MdAssignmentAdd } from "react-icons/md";

export default function Assistants() {
  const { data: assistantsList, isPending } = useAssistantList();
  const [assistant, setAssistant] = useState<IAssistantObject | undefined>();
  const [open, setOpen] = useState(false);
  const [openAssignModel, setOpenAssignModel] = useState(false);
  const sx = {
    textTransform: "none",
    borderRadius: "0.5rem",
    padding: "0.6rem 1rem",
    fontSize: "0.9rem",
  }
  return (
    <>
      <Container sx={{ mt: "2rem" }}>
        <div className="flex justify-between items-center flex-wrap mb-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              size="small"
              onClick={() => setOpenAssignModel(true)}
              sx={sx}
              startIcon={<MdAssignmentAdd />}
              variant="contained"
            >
              Assign Assistant
            </Button>
            <Button
              size="small"
              onClick={() => setOpen(true)}
              sx={sx}
              startIcon={<IoMdAddCircle className="text-xl mx-2" />}
              variant="contained"
            >
              Create New Assistant
            </Button>
          </div>
        </div>
        <AssistantTable
          data={assistantsList?.assistants || []}
          setAssistant={(assistant: IAssistantObject) => {
            setAssistant(assistant);
            setOpen(true);
          }}
          isDataLoading={isPending}
        />
        <CreateAssistantModal
          handleModel={() => setOpen(false)}
          open={open}
          assistant={assistant}
        />
        <AssistantAssignModal
          handleModel={() => setOpenAssignModel(false)}
          open={openAssignModel}
        />
      </Container>
    </>
  );
}
