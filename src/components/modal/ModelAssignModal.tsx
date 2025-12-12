import { Autocomplete, TextField } from "@mui/material";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAssignModel, { IAssignPost } from "../../hooks/Models/useAssignModel";
import useModelsList, { IModel } from "../../hooks/Models/useModelsList";
import useUsersList, { IUser } from "../../hooks/User/useUsersList";
import useDepartmentList, {
  IDepartment,
} from "../../hooks/departments/useDepartmentList";

interface ModelAssignModalProps {
  open: boolean;
  handleModel: () => void;
}

export default function ModelAssignModal({
  open,
  handleModel,
}: Readonly<ModelAssignModalProps>) {
  const [data, setData] = useState<IAssignPost>({
    userId: 0,
    modelId: 0,
    departmentId: 0,
  });
  const { data: modelsList } = useModelsList();
  const { data: usersList } = useUsersList();
  const { data: departmentsList } = useDepartmentList();
  const { mutate, isSuccess, isPending } = useAssignModel();

  const handleCreateChat = () => {
    if (data.modelId !== 0 && (data.userId !== 0 || data?.departmentId !== 0))
      mutate(data);
    else toast.error("Please select model and user");
  };
  const handleModelChange = (
    event: React.SyntheticEvent<Element, Event>,
    selectedOption: IModel | null
  ) => {
    if (selectedOption) {
      const selectedId = selectedOption.id;
      setData({ ...data, modelId: selectedId });
    } else {
      setData({ ...data, modelId: 0 });
      console.log("No option selected", event);
    }
  };
  const handleUserChange = (
    event: React.SyntheticEvent<Element, Event>,
    selectedOption: IUser | null
  ) => {
    if (selectedOption) {
      const selectedId = selectedOption.id;
      setData({ ...data, userId: selectedId });
    } else {
      setData({ ...data, userId: 0 });
      console.log("No option selected", event);
    }
  };
  const handleDeptChange = (
    event: React.SyntheticEvent<Element, Event>,
    selectedOption: IDepartment | null
  ) => {
    if (selectedOption) {
      const selectedId = selectedOption.id;
      setData({ ...data, departmentId: selectedId });
    } else {
      setData({ ...data, departmentId: 0 });
      console.log("No option selected", event);
    }
  };
  const handleReset = () => {
    setData({ userId: 0, modelId: 0 });
  };
  useEffect(() => {
    if (isSuccess) {
      handleReset();
      handleModel();
    }
  }, [isSuccess]);
  return (
    <Modal show={open} onClose={handleModel}>
      <Modal.Header>
        <div className="flex items-center justify-center w-full">
          Assign Model
        </div>
      </Modal.Header>
      <Modal.Body>
        <Autocomplete
          options={modelsList?.models || []}
          getOptionLabel={(option) => option.name}
          onChange={handleModelChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Model" variant="outlined" />
          )}
        />{" "}
        <Autocomplete
          sx={{ my: "20px" }}
          options={departmentsList?.list || []}
          getOptionLabel={(option) => option.title}
          onChange={handleDeptChange}
          disabled={data?.userId !== 0}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Department"
              variant="outlined"
            />
          )}
        />{" "}
        <Autocomplete
          sx={{ my: "20px" }}
          options={usersList?.list || []}
          getOptionLabel={(option) => option.name}
          onChange={handleUserChange}
          disabled={data?.departmentId !== 0}
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="outlined" />
          )}
        />
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "end" }}>
        <Button color="gray" onClick={handleModel}>
          Cancel
        </Button>
        <Button color="dark" onClick={handleCreateChat} disabled={isPending}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
