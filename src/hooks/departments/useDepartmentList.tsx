import APIClient from "../../services/api-client";
import { APIEndpoint } from "../../constants";

export interface IDepartment {
    id?: number;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    userCount: number
}
interface IFetch {
  list: IDepartment[];
}

const apiClient = new APIClient();

const useDepartmentList = () => {
  const endpoint = `${APIEndpoint.DEPARTMENT_LIST}`;
  return apiClient.getQuery<IFetch>(endpoint);
};

export default useDepartmentList;
