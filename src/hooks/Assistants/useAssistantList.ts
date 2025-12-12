import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IAssistant {
  id?: number;
  name: string;
  createdAt?: string;
  assistantId?: string;
  description: string;
}

interface IAssistantHistory {
  assistants: IAssistant[];
}

const apiClient = new APIClient();

const useAssistantList = () => {
  const endpoint = `${APIEndpoint.ASSISTANT_LIST}`;
  return useQuery<IAssistantHistory, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useAssistantList;
