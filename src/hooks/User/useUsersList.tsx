import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IUser {
  id?: number;
  name: string;
  email?: string;
  password?: string;
  role?: "admin" | "member"; // Assuming role can only be "admin" or "member"
  department: string;
  createdAt?: string;
}
interface IFetch {
  list: IUser[];
}

const apiClient = new APIClient();

const useUsersList = () => {
  const endpoint = `${APIEndpoint.USERS_LIST}`;
  return apiClient.getQuery<IFetch>(endpoint);
};

export default useUsersList;
