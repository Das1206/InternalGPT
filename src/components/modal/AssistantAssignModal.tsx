import { Autocomplete, TextField } from "@mui/material";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAssignAssistant, {
  IAssignAssistantPost,
} from "../../hooks/Assistants/useAssignAssistant";
import useAssistantList, {
  IAssistant,
} from "../../hooks/Assistants/useAssistantList";
import useUsersList, { IUser } from "../../hooks/User/useUsersList";
import useDepartmentList, {
  IDepartment,
} from "../../hooks/departments/useDepartmentList";

interface AssistantAssignModalProps {
  open: boolean;
  handleModel: () => void;
}

export default function AssistantAssignModal({
  open,
  handleModel,
}: Readonly<AssistantAssignModalProps>) {
  const [data, setData] = useState<IAssignAssistantPost>({
    userId: 0,
    assistantId: 0,
    departmentId: 0,
    assignId: 0,
  });
  const { data: assistantList } = useAssistantList();
  const { data: usersList } = useUsersList();
  const { mutate, isSuccess, isPending } = useAssignAssistant();
  const { data: departmentsList } = useDepartmentList();

  const handleCreateChat = () => {
    if (
      data.assistantId !== 0 &&
      (data.userId !== 0 || data?.departmentId !== 0)
    )
      mutate(data);
    else toast.error("Please select model and user");
  };
  const handleAssistantChange = (
    event: React.SyntheticEvent<Element, Event>,
    selectedOption: IAssistant | null
  ) => {
    if (selectedOption) {
      const selectedId = selectedOption.id;
      setData({ ...data, assistantId: selectedId });
    } else {
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
  const handleReset = () => {
    setData({ userId: 0, assistantId: 0, assignId: 0 });
  };
  useEffect(() => {
    if (isSuccess) {
      handleReset();
      handleModel();
    }
  }, [isSuccess]);
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
  return (
    <Modal show={open} onClose={handleModel}>
      <Modal.Header>
        <div className="flex items-center justify-center w-full">
          Assign Assistant
        </div>
      </Modal.Header>
      <Modal.Body>
        <Autocomplete
          options={assistantList?.assistants || []}
          getOptionLabel={(option) => option.name}
          onChange={handleAssistantChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Assistant"
              variant="outlined"
            />
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
        />
        <Autocomplete
          sx={{ my: "20px" }}
          options={usersList?.list || []}
          getOptionLabel={(option) => option.name}
          disabled={data?.departmentId !== 0}
          onChange={handleUserChange}
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
