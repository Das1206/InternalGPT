import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import useChatList, { IChat } from "../hooks/Chats/useChatsList";
import useModelsList from "../hooks/Models/useModelsList";

import { Routes } from "../constants";
import useChatStore from "../store/ChatStore";
import useDeleteChatById from "../hooks/Chats/useDeleteChatById";
import useClearChatHistory from "../hooks/Chats/useClearChatHistory";
import useUpdateChatTitle from "../hooks/Chats/useUpdateChatTitle";
import SelectModelCard from "./common/SelectModelCard";
import "./DotLoader";
import "./Sidebar.scss";
import Dialog from "./Dialog";
import DotLoader from "./DotLoader";
export interface IChatModel {
  id: number | undefined;
  title: string | null;
}
const Sidebar = ({ closeSideBar }: { closeSideBar?: () => void }) => {
  const { data: chatList, isLoading: chatListLoading, isError } = useChatList();
  const { mutate: deleteChatByIdMutate } = useDeleteChatById();
  const { mutate: clearChatHistoryMutate } = useClearChatHistory();
  const setChatId = useChatStore((s) => s.setChatId);
  const setModelId = useChatStore((s) => s.setModelId);
  const setAssistantId = useChatStore((s) => s.setAssistantId);
  const { data: modelsList, isLoading: modelListLoading } = useModelsList();
  const router = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isClearanceDialogOpen, setIsClearanceDialogOpen] = useState(false);
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);
  interface DeletePermissionInterface {
    id: number | null;
    openDialog: boolean;
    title: string;
  }
  const [deletePermission, setDeletePermission] = useState({
    id: -1,
    openDialog: false,
    title: "",
  } as DeletePermissionInterface);

  const selectedChatId = useChatStore((s) => s.chatId);
  const handleChatClick = (chat: IChat) => {
    if (pathname.split("/")[2] !== Routes.CHATS) {
      router(Routes.CHATS);
    }
    setChatId(chat.id);
    if (!isNaN(chat?.model)) setModelId(chat.model);
    else {
      const convertToString = chat?.model?.toString();
      setAssistantId(Number(convertToString.split("_")[1]));
    }
    closeSideBar && closeSideBar();
  };
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatList?.chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  interface ChatCardProps {
    chat: IChat;
  }
  const ChatCard = ({ chat }: ChatCardProps) => {
    const { title = "", id } = chat;
    const isActiveChat = selectedChatId === id;
    const [isEditable, setIsEditable] = useState(false);
    const {
      mutateAsync: updateTitleMutation,
      isPending,
    } = useUpdateChatTitle();
    const [newTitle, setNewTitle] = useState(title);
    function handleChatRename(e: React.ChangeEvent<HTMLInputElement>) {
      setIsEditable(false);
      if (isPending || newTitle === title) return;
      if (newTitle.trim() === "") {
        setNewTitle(title);
        return;
      }
      updateTitleMutation({ title: e.target.value.trim(), chatId: chat?.id });
    }
    return (
      <li
        className={`
        chat-card ${isActiveChat ? "chat-card--active" : ""} 
        flex flex-1 relative items-center justify-items-center rounded
        ${isPending ? "is-pending" : ""}
      `}
      >
        {isEditable ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleChatRename}
            className="chat-card__title flex-1 text-left text-base truncate border-0 p-3 bg-gray-100 outline-none focus:ring-0 rounded"
            autoFocus
          />
        ) : (
          <button
            className={`
                chat-card__title flex-1 text-left text-base truncate p-3
              `}
            onClick={() => handleChatClick(chat)}
          >
            {newTitle || title}
          </button>
        )}
        <div
          className={`
            chat-card__actions flex absolute right-0 rounded-tr rounded-br
          `}
        >
          {!isEditable && (
            <>
              <button
                title="Edit chat title"
                className="chat-card__edit"
                onClick={() => {
                  setIsEditable(true);
                }}
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
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>
              <div className="divider--vertical"></div>
              <button
                title="Delete chat"
                className="chat-card__delete"
                onClick={() =>
                  setDeletePermission({ id, openDialog: true, title })
                }
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
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </>
          )}
        </div>
      </li>
    );
  };
  return (
    <>
      <div
        id="chat_bar"
        className="flex flex-1 flex-col space-y-1 md:rounded-tl-lg md:rounded-bl-lg w-56 md:my-2 bg-white"
      >
        <div className="flex flex-col gap-2 bg-white p-2 md:p-4 pb-2 md:pb-2">
          <menu className="flex align-center gap-1">
            <li className="mr-auto">
              <button
                onClick={() => setIsNewChatDialogOpen(true)}
                className="button p-4 gap-2 text-white bg-black"
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
                New chat
              </button>
            </li>
            {/* <li>
              <button title="Open search bar"
                className="flex p-3 rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </button>
            </li>
            <li className="divider--vertical"></li> */}
            <li>
              <button
                title="Clear all conversations"
                onClick={() => setIsClearanceDialogOpen(true)}
                className="flex p-3 rounded cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
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
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </li>
          </menu>
          <input
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-3 rounded mb-2 text-black bg-gray-100"
          />
        </div>
        <div className="flex-col flex-1 overflow-y-auto p-2 md:p-4 pt-0 md:pt-0">
          {chatListLoading && (
            <div className="flex justify-center p-4">
              <DotLoader />
            </div>
          )}
          {chatList?.chats.length === 0 && "Chat list is empty..."}
          {isError ? (
            "Something went wrong..."
          ) : filteredChats?.length ? (
            <ul className="flex flex-col gap-1">
              {/* Render chat cards */}
              {filteredChats?.map((chat) => (
                <ChatCard key={chat.id} chat={chat} />
              ))}
            </ul>
          ) : (
            !chatListLoading && "No chats found..."
          )}
        </div>
      </div>
      <Dialog
        isOpen={isClearanceDialogOpen}
        title="You are about to clear all conversations!"
        description="Are you sure you want to clear all conversations? This action cannot be undone."
        confirmText="Yes, clear all!"
        onConfirm={() => {
          clearChatHistoryMutate(0);
        }}
        closeDialog={() => setIsClearanceDialogOpen(false)}
        isDanger={true}
      />
      <Dialog
        isOpen={deletePermission.openDialog}
        title={`You are about to delete "${deletePermission.title}" chat!`}
        description="Are you sure you want to delete this chat? This action cannot be undone."
        confirmText="Yes, delete it!"
        onConfirm={() => {
          deleteChatByIdMutate(deletePermission.id ?? -1);
        }}
        closeDialog={() =>
          setDeletePermission({
            id: null,
            openDialog: false,
            title: deletePermission.title,
          })
        }
        isDanger={true}
      />
      <Dialog
        isOpen={isNewChatDialogOpen}
        title="Create new chat"
        description="Select a model to start a new chat"
        closeDialog={() => setIsNewChatDialogOpen(false)}
        dialogPanelStyle={{ width: "min(56rem, 100%)" } as React.CSSProperties}
      >
        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 overflow-y-auto h-full px-6 pb-6">
          {modelListLoading && <DotLoader />}
          {modelsList?.models?.map((model) => (
            <li key={model.id}>
              <SelectModelCard
                {...model}
                handleModel={() => setIsNewChatDialogOpen(false)}
                model={model}
              />
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
};

export default Sidebar;
