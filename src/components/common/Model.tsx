import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateFavoriteModel from "../../hooks/Models/useCreateFavoriteModel";
import useDeleteModelById from "../../hooks/Models/useDeleteModelById";
import useChatStore from "../../store/ChatStore";
import Dialog from "../Dialog";

export default function Model({
  type,
  name,
  description,
  isFavorite,
  handleModel,
  model,
  id,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  const { mutate: deleteModel } = useDeleteModelById();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: addFavoriteModelMutation } = useCreateFavoriteModel();
  const changeModelId = useChatStore((s) => s.setModelId);
  const modelId = useChatStore((s) => s.modelId);
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          changeModelId(id);
          if (currentUrl !== "/app/chats") navigate("/app/chats");
        }}
        className={`
        flex flex-col gap-2 p-6 shadow border-gray-500 w-full h-full 
        text-start justify-start  bg-white rounded-lg items-start
        ${modelId == id && "border"}
        `}
      >
        <div className="flex items-center flex-col mb-2 text-lg font-semibold tracking-tight text-gray-900 ">
          {name}
        </div>
        <p className="text-justify text-sm text-gray-700 mb-4">{description}</p>
        <div className="flex w-full items-center gap-1 mt-auto">
          <button
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="active:scale-95 duration-200 ease-in-out transition-transform 
            focus-ring-0 p-2 bg-gray-100 rounded mr-auto"
            onClick={() => {
              const model = {
                modelId: id,
                isFavorite: !isFavorite,
              };
              addFavoriteModelMutation(model);
            }}
          >
            <svg
              className={`feather feather-star ${
                isFavorite ? "fill-current" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          {type === "company" ||
          (model.isEdit !== null && model.isEdit == false) ? (
            ""
          ) : (
            <>
              <button
                className="active:scale-95 duration-200 ease-in-out transition-transform 
            focus-ring-0 p-2 bg-gray-100 rounded"
                title="Edit Model Details"
                onClick={() => handleModel(model)}
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
                  className="feather feather-edit-2"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>{" "}
              <button
                className="active:scale-95 duration-200 ease-in-out transition-transform 
            focus-ring-0 p-2 bg-gray-100 rounded"
                title="Delete Model"
                onClick={() => setIsDeleteDialogOpen(true)}
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
                  className="feather feather-trash"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <Dialog
        isOpen={isDeleteDialogOpen}
        closeDialog={() => setIsDeleteDialogOpen(false)}
        title={`You are about to delete ${name}`}
        description="Confirm to delete the model."
        confirmText="Yes, delete it!"
        cancelText="No"
        isDanger={true}
        onConfirm={() => {
          deleteModel(id);
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
}
