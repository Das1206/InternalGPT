import { Button, Container } from "@mui/material";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import useDepartmentList from "../../hooks/departments/useDepartmentList";
import DepartmentsTable from "../../components/common/Tables/DepartmentsTable";
import CreateDepartmentModal from "../../components/modal/CreateDepartmentModal";
export default function Departments() {
  const { data, isPending } = useDepartmentList();
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-y-auto">
      <Container sx={{ mt: "2rem", overflow: 'auto' }}>
        <div className="flex justify-between items-center flex-wrap mb-4">
          <Button
            onClick={() => setOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1rem",
              fontSize: "0.9rem",
            }}
            startIcon={<IoMdAddCircle className="text-xl" />}
            variant="contained"
          >
            Create New Department
          </Button>
        </div>
        <DepartmentsTable data={data?.list || []} isDataLoading={isPending} />
      </Container>
      <CreateDepartmentModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
}
