/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ChatComponent from "../components/ChatComponent";
import useChatHistory from "../hooks/Chats/useChatHistory";
// import useAutoResizeTextArea from "../hooks/useAutoResizeTextArea";
import useChatStore from "../store/ChatStore";
import toast from "react-hot-toast";
import useChatMutate from "../hooks/Chats/useChatMutate ";
import { IModel } from "../hooks/Models/useModelsList";
import ImageUploader from "../components/Input/ImageUploader";
import useAssistantChatMutate from "../hooks/Chats/useAssistantChatMutate";
import "./Chat.scss";

export default function Chat() {
  const id = useChatStore((s) => s.chatId);
  const modelId = useChatStore((s) => s.modelId);
  const assistantId = useChatStore((s) => s.assistantId);

  const { data, isLoading: historyLoading } = useChatHistory(id);

  const [query, setQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | File | undefined>(
    ""
  );

  const { mutate, isPending: isModelMsgPending } = useChatMutate();
  const {
    mutate: assistantMutate,
    isPending: isAssistantMsgPending,
  } = useAssistantChatMutate();

  const hasSelectedChatRecipient = modelId || assistantId !== 0;
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Don't send empty messages
    if (query.length === 0) {
      toast("Please enter a message.");
      return;
    }
    if (!hasSelectedChatRecipient) {
      toast("Please Select a model");
      return;
    }
    if (modelId !== 0)
      mutate({
        query,
        modelId,
        ...(id !== null ? { chatId: id } : {}),
        ...(modelId !== 0 && selectedImage
          ? { imageUrl: "data:image/jpeg;base64," + selectedImage }
          : {}),
      });
    else if (assistantId !== 0)
      assistantMutate({
        query,
        assistantId,
        ...(id !== null ? { chatId: id } : {}),
        ...(assistantId !== 0 && selectedImage ? { file: selectedImage } : {}),
      });
    setQuery("");
    setSelectedImage("");
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the default form submission
      handleSubmit(event);
    }
  };
  return (
    <>
      {hasSelectedChatRecipient ? (
        <ChatComponent
          historyLoading={historyLoading}
          messageLoading={isAssistantMsgPending || isModelMsgPending}
          history={data?.chats || []}
          setSelectedModel={setSelectedModel}
        >
          <div className="sticky bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent  bg-white dark:-800 md:!bg-transparent pt-2">
            <form
              className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
              onSubmit={handleSubmit}
            >
              <div className="relative flex flex-1 shadow-inner rounded-lg border items-center bg-gray-100">
                {(selectedModel?.allowFile || assistantId !== 0) && (
                  <>
                    <ImageUploader
                      isAssistant={assistantId !== 0}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                    />
                    <div className="divider--vertical"></div>
                  </>
                )}
                <div className="grow-wrap flex-1 flex-shrink-0">
                  <textarea
                    value={query}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full border-0 resize-none bg-transparent focus:outline-none focus:ring-0"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      e.target.parentNode.dataset.replicatedValue =
                        e.target.value;
                    }}
                    rows={1}
                  ></textarea>
                </div>
                <div className="divider--vertical"></div>
                <button
                  disabled={
                    isAssistantMsgPending || isModelMsgPending || !query
                  }
                  type="submit"
                  className="p-4 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="feather feather-send"
                    width="24"
                    height="24"
                    viewBox="0 0 21.09 20.38"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <polygon points="20.09 10.19 1 19.38 4.54 10.19 1 1 20.09 10.19" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </ChatComponent>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Welcome, Glad to have you here
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Click on "New Chat" to start a conversation
            </p>
          </div>
        </div>
      )}
    </>
  );
}
