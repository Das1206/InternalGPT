import useModelsList, { IModel } from "../../hooks/Models/useModelsList";
import SelectModelCard from "../common/SelectModelCard";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DotLoader from "../DotLoader";
interface CreateModelProps {
  open: boolean;
  handleModel: () => void;
  model?: IModel | null;
}
export default function CreateNewChatModel({
  open,
  handleModel,
}: Readonly<CreateModelProps>) {
  const { data: modelsList, isLoading: modelListLoading } = useModelsList();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleModel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="flex flex-col w-full max-w-4xl transform rounded-xl bg-white text-left align-middle shadow-xl transition-all overflow-hidden"
                style={{ maxHeight: "90vh" }}
              >
                <Dialog.Title
                  as="h3"
                  className=" flex justify-between text-xl font-bold leading-6 text-gray-900 px-6 pt-8"
                >
                  New Chat
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    tabIndex={0}
                    onClick={handleModel}
                  >
                    X
                  </button>
                </Dialog.Title>
                <Dialog.Description className="px-6 pb-4 text-sm text-gray-500">
                  Select a model to start a new chat
                </Dialog.Description>
                <ul className="grid md:grid-cols-2  gap-4 overflow-y-auto h-full">
                  {modelListLoading && <DotLoader />}
                  {modelsList?.models?.map((model) => (
                    <li key={model.id}>
                      <SelectModelCard
                        {...model}
                        handleModel={handleModel}
                        model={model}
                      />
                    </li>
                  ))}
                </ul>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  );
}
