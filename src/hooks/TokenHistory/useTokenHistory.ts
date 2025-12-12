import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IHistory {
  id: number;
  tokens: number;
  query: string;
  department: string;
  name: string;
  createdAt: string;
}
interface ITokenHistory {
  list: IHistory[];
}

const apiClient = new APIClient();

const useTokenHistory = () => {
  const endpoint = `${APIEndpoint.TOKEN_HISTORY}`;
  return useQuery<ITokenHistory, Error>({
    queryKey: [endpoint],
    queryFn: () => apiClient.getAll(endpoint),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useTokenHistory;
