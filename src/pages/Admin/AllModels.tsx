import { Button, Container } from "@mui/material";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import useModelsList, { IModel } from "../../hooks/Models/useModelsList";
import ModelsTable from "../../components/common/Tables/ModelsTable";
import CreateModel from "../../components/modal/createModel";
import ModelAssignModal from "../../components/modal/ModelAssignModal";
import { MdAssignmentAdd } from "react-icons/md";
export default function AllModels() {
  const { data, isPending } = useModelsList();
  const [model, setModel] = useState<IModel | undefined>();
  const [open, setOpen] = useState(false);
  const [openAssignModel, setOpenAssignModel] = useState(false);
  return (
    <div className="overflow-x-auto">
      <Container sx={{ mt: "2rem" }}>
        <div className="flex gap-2 flex-wrap mb-4">
          <Button
            onClick={() => setOpenAssignModel(true)}
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1rem",
              fontSize: "0.9rem",
            }}
            startIcon={<MdAssignmentAdd className="text-xl mx-2" />}
            variant="contained"
          >
            Assign Model
          </Button>
          <Button
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1rem",
              fontSize: "0.9rem",
            }}
            startIcon={<IoMdAddCircle />}
            variant="contained"
          >
            Create New Model
          </Button>
        </div>
        <ModelsTable
          data={data?.models || []}
          setModel={(model: IModel) => {
            setModel(model);
            setOpen(true);
          }}
          isDataLoading={isPending}
        />
      </Container>
      <CreateModel
        open={open}
        handleModel={() => setOpen(false)}
        model={model}
      />
      <ModelAssignModal
        handleModel={() => setOpenAssignModel(false)}
        open={openAssignModel}
      />
    </div>
  );
}
