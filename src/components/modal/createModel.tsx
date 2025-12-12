import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { IModel } from "../../hooks/Models/useModelsList";
import useCreateModelMutate from "../../hooks/Models/useCreateModelMutate";
import useModelUpdate from "../../hooks/Models/useModelUpdate";
interface CreateModelProps {
  open: boolean;
  handleModel: () => void;
  model?: IModel | null;
}
export default function CreateModel({
  open,
  handleModel,
  model,
}: Readonly<CreateModelProps>) {
  const [data, setData] = useState<IModel>({
    name: "",
    systemPrompt: "",
    description: "",
    modelType: "",
    allowFile: false,
  });
  const {
    mutate: createModel,
    isSuccess: createSuccess,
    isPending,
  } = useCreateModelMutate();
  const {
    mutate: updateModel,
    isSuccess: updateSuccess,
    isPending: updatePending,
  } = useModelUpdate();

  const handleSaveModel = () => {
    if (data.id) updateModel(data);
    else createModel(data);
  };

  useEffect(() => {
    if (model) setData(model);
  }, [model]);
  useEffect(() => {
    if (updateSuccess || createSuccess) {
      setData({
        name: "",
        systemPrompt: "",
        description: "",
        modelType: "",
        allowFile: false,
      });
      handleModel();
    }
  }, [updateSuccess, createSuccess]);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {" "}
      <Modal show={open} onClose={handleModel}>
        <Modal.Header>
          <h2 className="font-bold flex items-center justify-center w-full">
            Create New Model
          </h2>
        </Modal.Header>
        <Modal.Body>
          {/* Dropdown with Label */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Select Model
            </label>
            <select
              id="model"
              value={data.modelType}
              onChange={(e) => setData({ ...data, modelType: e.target.value })}
              name="model"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="gpt-3.5-turbo">OpenAI Gpt3.5</option>
              <option value=">gpt-4-vision-preview">OpenAI Gpt4</option>
              <option value="gpt-4-vision-preview">OpenAI Gpt 4 Turbo</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* System Prompt and Description (Textarea) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              System Prompt
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={data.systemPrompt}
              onChange={(e) =>
                setData({ ...data, systemPrompt: e.target.value })
              }
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="prompt"
              name="prompt"
              rows={4}
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <label className="flex gap-2 cursor-pointer items-center mb-4 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              type="checkbox"
              checked={data.allowFile}
              onChange={(e) =>
                setData({ ...data, allowFile: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
            />
            Allow File Upload
          </label>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "end" }}>
          <Button color="gray" onClick={handleModel}>
            Cancel
          </Button>
          <Button
            color="dark"
            onClick={handleSaveModel}
            disabled={isPending || updatePending}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
