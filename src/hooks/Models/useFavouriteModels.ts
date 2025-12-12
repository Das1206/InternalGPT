import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";
import { IModel } from "./useModelsList";

interface IFetch {
  models: IModel[];
}

const apiClient = new APIClient();

const useFavouriteModelsList = () => {
  const endpoint = `${APIEndpoint.FAVOURITE_MODELS}`;
  return apiClient.getQuery<IFetch>(endpoint);
};

export default useFavouriteModelsList;
