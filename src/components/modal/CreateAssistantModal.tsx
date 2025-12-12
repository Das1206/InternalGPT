import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useCreateAssistantMutate from "../../hooks/Assistants/useCreateAssistantMutate";
interface CreateAssistantModalProps {
  open: boolean;
  handleModel: () => void;
  assistant?: IAssistantObject;
}

export interface IAssistantObject {
  name: string;
  assistantId: string;
  id?: number;
  description: string;
}
export default function CreateAssistantModal({
  open,
  handleModel,
  assistant,
}: Readonly<CreateAssistantModalProps>) {
  const { mutate, isPending, isSuccess } = useCreateAssistantMutate();
  const [data, setData] = useState<IAssistantObject>({
    name: "",
    description: "",
    assistantId: "",
  });

  useEffect(() => {
    if (assistant) setData(assistant);
  }, [assistant]);
  const handleClose = () => {
    setData({ name: "", description: "", assistantId: "" });
    handleModel();
  };

  const handleSubmit = () => {
    if (!assistant?.id) mutate(data);
  };
  useEffect(() => {
    if (isSuccess) handleClose();
  }, [isSuccess]);
  return (
    <div>
      {" "}
      <Modal show={open} onClose={handleClose}>
        <Modal.Header>
          <div className="flex items-center justify-center w-full">
            Create New Assistant
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>{" "}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Assistant ID
            </label>
            <input
              type="text"
              value={data?.assistantId}
              onChange={(e) =>
                setData({ ...data, assistantId: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
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
