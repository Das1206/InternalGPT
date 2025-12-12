import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IAssistant {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  department?: string;
  assistant: string;
  assistantId: number;
}
interface IAssistantHistory {
  models: IAssistant[];
}

const apiClient = new APIClient();

const useAssignedAssistantList = () => {
  const endpoint = `${APIEndpoint.ASSIGN_ASSISTANT_LIST}`;
  return useQuery<IAssistantHistory, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useAssignedAssistantList;
