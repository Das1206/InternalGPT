import { useNavigate } from "react-router-dom";
import useChatStore from "../../store/ChatStore";
import { Routes } from "../../constants";
import Capitalize from "../Utils/Capitalize";

export default function AssistantCard({
  name,
  id,
  description,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any) {
  const changeChatID = useChatStore((s) => s.setChatId);
  const changeAssistantID = useChatStore((s) => s.setAssistantId);
  const navigate = useNavigate();
  return (
    <button
      title={`Start Chat with ${name}`}
      onClick={() => {
        changeChatID(undefined);
        changeAssistantID(id);

        navigate("/app/" + Routes.CHATS);
      }}
      className={`
      flex flex-col gap-2 p-6 shadow  border-gray-200 border w-full h-full 
      text-start justify-start active:scale-95 duration-200 ease-in-out transition-transform 
      focus-ring-0 bg-white rounded-lg items-start
      `}
    >
      <div className="mb-2 text-lg font-semibold tracking-tight text-gray-900 ">
        {Capitalize(name)}
      </div>
      <p
        className="text-sm text-gray-700 leading-6"
      >
        {description}
      </p>
      <svg className="feather feather-arrow-right mt-auto ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    </button>
  );
}
