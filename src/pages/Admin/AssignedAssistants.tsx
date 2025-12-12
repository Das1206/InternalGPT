import { Container } from "@mui/material";
import { useState } from "react";

import AssistantAssignModal from "../../components/modal/AssistantAssignModal";
import useAssignedAssistantList from "../../hooks/Assistants/useAssignedAssistantList";
import AssignAssistantTable from "../../components/common/Tables/AssignAssistantTables";

export default function AssignedAssistants() {
  const { data: assistantsList, isPending } = useAssignedAssistantList();
  const [openAssignModel, setOpenAssignModel] = useState(false);

  return (
    <Container sx={{ mt: "2rem" }}>
      <AssignAssistantTable
        data={assistantsList?.models || []}
        isDataLoading={isPending}
      />

      <AssistantAssignModal
        handleModel={() => setOpenAssignModel(false)}
        open={openAssignModel}
      />
    </Container>
  );
}
