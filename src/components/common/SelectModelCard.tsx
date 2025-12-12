import { useNavigate } from "react-router";
import useChatStore from "../../store/ChatStore";
import { Routes } from "../../constants";

export default function SelectModelCard({
  name,
  description,
  id,
  handleModel,
  // model,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any) {
  // const modelId = useChatStore((s) => s.modelId);
  const changeModelId = useChatStore((s) => s.setModelId);
  const changeChatId = useChatStore((s) => s.setChatId);
  const navigate = useNavigate();

  // ${modelId && modelId == model.id ? " border-gray-900  bg-gray-200 " : "bg-white"}
  return (
    <button
      className={`
        flex flex-col gap-2 p-4 shadow  border-gray-200 border w-full h-full 
        text-start justify-start active:scale-95 duration-200 ease-in-out transition-transform 
        focus-ring-0 bg-white rounded-lg items-start
      `}
      onClick={() => {
        changeModelId(id);
        changeChatId(undefined);
        handleModel();
        navigate("/app/" + Routes.CHATS);
      }}
    >
      <div className="flex text-lg font-semibold tracking-tight text-gray-900">
        {name}
      </div>
      <p
        className="mb-3 text-sm text-gray-700 "
      >
        {description}
      </p>
    </button>
  );
}
