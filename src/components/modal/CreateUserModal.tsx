import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useCreateUserMutate, {
  IPost,
} from "../../hooks/User/useCreateUserMutate";
import useUserUpdate, { IUserPost } from "../../hooks/User/useUserUpdate";
import { IUser } from "../../hooks/User/useUsersList";
import useDepartmentList, {
  IDepartment,
} from "../../hooks/departments/useDepartmentList";
import { Autocomplete, TextField } from "@mui/material";

interface CreateUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: IUserPost | undefined;
}

export default function CreateUserModal({
  open,
  handleClose,
  user,
}: Readonly<CreateUserModalProps>) {
  const [userData, setUserData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const {
    mutate: createUser,
    isSuccess: createSuccess,
    isPending,
  } = useCreateUserMutate();
  const {
    mutate: updateUser,
    isSuccess: updateSuccess,
    isPending: updatePending,
  } = useUserUpdate();
  const { data: departmentsList } = useDepartmentList();

  useEffect(() => {
    // Reset form fields when the modal is closed
    if (!open) {
      handleReset();
    }
  }, [open]);
  useEffect(() => {
    if (user) setUserData(user);
  }, [user]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (userData?.id) updateUser(userData);
    else createUser(userData as IPost);
  };
  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleReset();
      handleClose();
    }
  }, [createSuccess, updateSuccess]);
  const handleDeptChange = (
    event: React.SyntheticEvent<Element, Event>,
    selectedOption: IDepartment | null
  ) => {
    if (selectedOption) {
      const selectedTitle = selectedOption.title;
      setUserData({ ...userData, department: selectedTitle });
    } else {
      setUserData({ ...userData, department: "" });
      console.log("No option selected", event);
    }
  };
  const handleReset = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      department: "",
    });
  };
  return (
    <div>
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>
          <div className="flex items-center justify-center w-full">
            Create New User
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {!userData?.id && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <Autocomplete
              sx={{ my: "20px" }}
              options={departmentsList?.list || []}
              getOptionLabel={(option) => option.title}
              onChange={handleDeptChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Department"
                  variant="outlined"
                />
              )}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "end" }}>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="dark"
            onClick={handleSubmit}
            disabled={isPending || updatePending}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
