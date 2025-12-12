import { Container } from "@mui/material";

import AssignModelTable from "../../components/common/Tables/AssignModelTable";
import useAssignedModelList from "../../hooks/Models/useAssignedModelList";

export default function AssignedModels() {
  const { data: modelsData, isPending } = useAssignedModelList();
  return (
    <div className="overflow-y-auto">
      <Container sx={{ mt: "2rem" }}>
        <AssignModelTable
          data={modelsData?.models || []}
          isDataLoading={isPending}
        />
      </Container>
    </div>
  );
}
