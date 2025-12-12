import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useUpdateChatTitle from "../../hooks/Chats/useUpdateChatTitle";
import { IChatModel } from "../Sidebar";

interface CreateChatModelProps {
  open: boolean;
  handleModel: () => void;
  chat: IChatModel | null;
}

export default function CreateChatModel({
  open,
  handleModel,
  chat,
}: Readonly<CreateChatModelProps>) {
  const [name, setName] = useState<string | null | undefined>(chat?.title);
  const { mutateAsync: updateTitleMutation, isPending } = useUpdateChatTitle();

  const handleCreateChat = () => {
    updateTitleMutation({ title: name, chatId: chat?.id });
    handleModel();
  };

  useEffect(() => {
    setName(chat?.title);
  }, [chat]);

  return (
    <Modal show={open} onClose={handleModel}>
      <Modal.Header>
        <div className="flex items-center justify-center w-full">
          Rename Chat
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Chat Name
          </label>
          <input
            type="text"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "end" }}>
        <Button color="gray" onClick={handleModel}>
          Cancel
        </Button>
        <Button color="dark" onClick={handleCreateChat} disabled={isPending}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
