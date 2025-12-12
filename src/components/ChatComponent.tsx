/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import Message from "./Message";
import { IMessage } from "../hooks/Chats/useChatHistory";
import useChatStore from "../store/ChatStore";
import useModelsList, { IModel } from "../hooks/Models/useModelsList";
import useAssistantList, {
  IAssistant,
} from "../hooks/Assistants/useAssistantList";
import useMyModelsList from "../hooks/Models/useMyModelsList";
import useMyAssistantList, {
  IAssistant as myAssistant,
} from "../hooks/Assistants/useMyAssistantList";
import UserContext from "../Contexts/UserContext";
import "./ChatComponent.scss";
import DotLoader from "./DotLoader";
interface Props {
  messageLoading: boolean;
  historyLoading: boolean;
  history: IMessage[];
  children: ReactNode;
  setSelectedModel: Dispatch<SetStateAction<null | IModel>>;
}
const ChatComponent = ({
  messageLoading,
  historyLoading,
  history,
  children,
  setSelectedModel,
}: Props) => {
  const context = useContext(UserContext);
  const user = context?.user;
  const modelId = useChatStore((s) => s.modelId);
  const assistantId = useChatStore((s) => s.assistantId);
  const { data: modelsList } = useModelsList();
  const { data: assistantsList } = useAssistantList();
  const { data: myModelsList } = useMyModelsList();
  const { data: myAssistantsList } = useMyAssistantList();
  let selectedItem: IModel | IAssistant | myAssistant | undefined = undefined;
  if (user?.role === "admin") {
    if (modelId !== 0)
      selectedItem = modelsList?.models?.filter((m) => m.id == modelId)[0];
    else if (assistantId !== 0)
      selectedItem = assistantsList?.assistants?.filter(
        (a) => a.id == assistantId
      )[0];
  } else {
    if (modelId !== 0)
      selectedItem = myModelsList?.models?.filter((m) => m.id == modelId)[0];
    else if (assistantId !== 0)
      selectedItem = myAssistantsList?.assistants?.filter(
        (a) => a.id == assistantId
      )[0];
  }
  if (modelId !== 0) setSelectedModel(selectedItem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomOfChatRef = useRef<any>(null);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <div className="relative w-full flex flex-col h-full items-stretch flex-1 mt-12 md:mt-0">
      {historyLoading && (
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <DotLoader />
        </div>
      )}
      {selectedItem?.name && (
        <details className="mt-4 md:mt-0">
          <summary className="flex flex-row items-center gap-2 justify-center text-sm cursor-pointer p-4 select-none">
            <span className="font-medium">{selectedItem?.name}</span>
            {selectedItem?.description && (
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
                className="feather feather-info"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
          </summary>
          {selectedItem?.description && (
            <div className="text-center pb-4">{selectedItem?.description}</div>
          )}
        </details>
      )}

      {history.length > 0 ? (
        <div
          id="chat_container"
          className="flex flex-col items-center overflow-y-scroll h-full gap-4 p-4"
        >
          {history.map((message, index) => (
            <Message
              key={index}
              message={message}
              isLastMsg={index === history.length - 1}
              loading={messageLoading || historyLoading}
            />
          ))}
          <div className="w-full h-32 md:h-48 flex-shrink-0 "></div>
          <div ref={bottomOfChatRef}></div>
        </div>
      ) : (
        <div className="h-full"></div>
      )}

      {children}
    </div>
  );
};

export default ChatComponent;
