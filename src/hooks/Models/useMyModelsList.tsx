import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IModel {
  id?: number;
  name: string;
  modelType: string;
  systemPrompt: string;
  description: string;
  allowFile: boolean;
  createdAt?: string;
  isFavorite?: boolean | number;
  isEdit?: boolean;
}
interface IFetch {
  models: IModel[];
}

const apiClient = new APIClient();

const useMyModelsList = () => {
  const endpoint = `${APIEndpoint.MY_MODELS}`;
  return apiClient.getQuery<IFetch>(endpoint);
};

export default useMyModelsList;
