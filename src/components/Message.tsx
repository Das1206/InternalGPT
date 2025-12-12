import { API_URL } from "../constants";
import Markdown from "react-markdown";
import "./Message.scss";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Message = (props: any) => {
  const { message, loading, isLastMsg } = props;
  const { role, content: text, type } = message;

  const isUser = role === "user";

  return (
    <div
      className={`message group text-gray-800  ${isUser ? "message--sent" : "message--received"
        }`}
    >
      <div className="text-base gap-4 flex w-full">
        <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 ml-4 -translate-x-full group-hover:visible !invisible">
          <button
            disabled
            className="text-gray-300 dark:text-gray-400"
          ></button>
          <span className="flex-grow flex-shrink-0">1 / 1</span>
          <button
            disabled
            className="text-gray-300 dark:text-gray-400"
          ></button>
        </div>
        {loading && isLastMsg && !isUser ? (
          <img
            className="typing-animation"
            src="/typing-animation.gif"
            width={"50"}
          />
        ) : type === "image" ? (
          <img src={`${API_URL}uploads/${text}`} width={"150"} />
        ) : (
          <Markdown className="flex flex-col items-start gap-4 whitespace-pre-wrap break-words max-w-prose">
            {text}
          </Markdown>
        )}
      </div>
    </div>
  );
};

export default Message;
