import React, { useContext, useState } from "react";

import UserContext from "../Contexts/UserContext";
import DotLoader from "../components/DotLoader";
import AssistantCard from "../components/common/AssistantCard";
import Model from "../components/common/Model";
import CreateAssistantModal from "../components/modal/CreateAssistantModal";
import CreateModel from "../components/modal/createModel";
import useMyAssistantList from "../hooks/Assistants/useMyAssistantList";
import useModelsList from "../hooks/Models/useModelsList";
import useMyModelsList from "../hooks/Models/useMyModelsList";

export default function Models() {
  const { data: modelsList, isLoading: modelListLoading } = useModelsList();
  const {
    data: myModelsList,
    isLoading: myModelListLoading,
  } = useMyModelsList();
  const {
    data: myAssistantsList,
    isLoading: myAssistantListLoading,
  } = useMyAssistantList();
  const [model, setModel] = useState(null);
  const [showContent, setShowContent] = useState("models");
  const [open, setOpen] = React.useState(false);
  const context = useContext(UserContext);
  const user = context?.user;
  const handleOpen = () => {
    setModel(null);
    setOpen(!open);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateModel = (model: any) => {
    setModel(model);
    setOpen(true);
  };
  const isAdmin = user?.role === "admin";
  const viewSelectorButtonStyle =
    "font-medium active:scale-95 duration-200 ease-in-out transition-transform focus-ring-0 px-4 py-2 bg-gray-100 rounded flex-shrink-0";
  return (
    <>
      <div className="container px-4 md:px-10 lg:px-16 overflow-y-auto">
        <div
          className="flex flex-col sticky top-0 bg-white gap-4 mb-4 -mx-4 px-4"
          style={{ width: "calc(100% + 2rem)" }}
        >
          <h1 className="font-bold text-2xl pt-6 md:pt-12">Agents Library</h1>
          <div className="flex flex-col flex-1 gap-2 lg:flex-row my-2 justify-between lg:items-center">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto md:mr-auto">
              <button
                className={`${viewSelectorButtonStyle} ${
                  showContent === "models" ? "bg-gray-800 text-gray-100" : ""
                }`}
                onClick={() => setShowContent("models")}
              >
                Models
              </button>
              <button
                className={`${viewSelectorButtonStyle} ${
                  showContent === "company" ? "bg-gray-800 text-gray-100" : ""
                }`}
                onClick={() => setShowContent("company")}
              >
                Company Models
              </button>
              <button
                className={`${viewSelectorButtonStyle} ${
                  showContent === "assistants"
                    ? "bg-gray-800 text-gray-100"
                    : ""
                }`}
                onClick={() => setShowContent("assistants")}
              >
                Assistants
              </button>
            </div>
            {isAdmin && (
              <div>
                {showContent === "models" || showContent === "company" ? (
                  <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 rounded-lg border-2 border-gray-300	py-2 px-3 font-medium active:scale-95 duration-200 ease-in-out transition-transform focus-ring-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Model
                  </button>
                ) : (
                  <button
                    onClick={handleOpen}
                    className="flex items-center gap-2 rounded border-2 border-gray-300 py-2 px-3 font-medium active:scale-95 duration-200 ease-in-out transition-transform focus-ring-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Assistant
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {showContent === "models" ? (
          <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {(modelListLoading || myModelListLoading) && <DotLoader />}
            {isAdmin
              ? modelsList?.models.length === 0 && "Model list is empty..."
              : myModelsList?.models.length === 0 && "Model list is empty..."}
            {isAdmin
              ? modelsList?.models?.map((model) => (
                  <div key={model.id}>
                    <Model
                      {...model}
                      handleModel={handleUpdateModel}
                      model={model}
                    />
                  </div>
                ))
              : myModelsList?.models?.map((model) => (
                  <div key={model.id}>
                    <Model
                      {...model}
                      handleModel={handleUpdateModel}
                      model={model}
                    />
                  </div>
                ))}
          </div>
        ) : showContent === "company" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {modelListLoading && <DotLoader />}
            {modelsList?.companyModels?.length === 0 &&
              "Model list is empty..."}
            {modelsList?.companyModels?.map((model) => (
              <div key={model.id}>
                <Model
                  {...model}
                  type="company"
                  handleModel={handleUpdateModel}
                  model={model}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4">
            {myAssistantListLoading && <DotLoader />}
            {myAssistantsList?.assistants?.length === 0 &&
              "Assistant list is empty..."}
            {myAssistantsList?.assistants?.map((assistant) => (
              <div key={assistant.id}>
                <AssistantCard {...assistant} />
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateModel
        handleModel={handleOpen}
        open={open && showContent === "models"}
        model={model}
      />
      <CreateAssistantModal
        handleModel={handleOpen}
        open={open && showContent === "assistants"}
      />
    </>
  );
}
