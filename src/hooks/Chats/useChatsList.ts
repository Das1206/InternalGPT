import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IChat {
  id: number;
  title: string;
  model: number;
  createdAt: string;
}
interface IFetch {
  chats: IChat[];
}
const apiClient = new APIClient();

const useChatList = () => {
  const endpoint = `${APIEndpoint.CHATS_LIST}`;
  return useQuery<IFetch, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useChatList;
