import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IModel {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  modelId: number;
}
interface IModelHistory {
  models: IModel[];
}

const apiClient = new APIClient();

const useAssignedModelList = () => {
  const endpoint = `${APIEndpoint.ASSIGN_MODEL_LIST}`;
  return useQuery<IModelHistory, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useAssignedModelList;
