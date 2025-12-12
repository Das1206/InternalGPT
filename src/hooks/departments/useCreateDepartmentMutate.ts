import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";

export interface IDeptPost {
  title: string;
  
}
interface IFetch {
  message: string;
}

const useCreateDepartmentMutate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IDeptPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.DEPARTMENT_ADD}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [`${APIEndpoint.DEPARTMENT_LIST}`],
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(
        (err.response?.data.message as string) || "Something went wrong"
      );
    },
  });
};

export default useCreateDepartmentMutate;
