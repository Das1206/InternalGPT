import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IMessage {
  id: number;
  chatId: number;
  content: string;
  role: "user" | "bot";
  type: "image" | "text";
  createdAt: string;
}
export interface ICHatHistory {
  chats: IMessage[];
}
const apiClient = new APIClient();

const useChatHistory = (id: number | undefined) => {
  const endpoint = `${APIEndpoint.CHAT_HISTORY}/${id}`;
  return useQuery<ICHatHistory, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useChatHistory;
