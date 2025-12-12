import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useCreateDepartmentMutate, { IDeptPost } from "../../hooks/departments/useCreateDepartmentMutate";

interface CreateDepartmentModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateDepartmentModal({
  open,
  handleClose,
}: Readonly<CreateDepartmentModalProps>) {
  const [DepartmentData, setDepartmentData] = useState<IDeptPost>({
    title: "",
  });
  const { mutate: createDepartment, isSuccess: createSuccess, isPending } =
    useCreateDepartmentMutate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    createDepartment(DepartmentData);
  };
  useEffect(() => {
    if (createSuccess) {
      handleReset();
      handleClose();
    }
  }, [createSuccess]);

  const handleReset = () => {
    setDepartmentData({
      title: "",
    });
  };
  return (
    <div>
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>
          <div className="flex items-center justify-center w-full">
            Create New Department
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={DepartmentData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "end" }}>
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleSubmit} disabled={isPending}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
