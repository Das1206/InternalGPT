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
}
interface IFetch {
  models: IModel[];
  companyModels: IModel[];
}

const apiClient = new APIClient();

const useModelsList = () => {
  const endpoint = `${APIEndpoint.MODELS_LIST}`;
  return apiClient.getQuery<IFetch>(endpoint);
};

export default useModelsList;
