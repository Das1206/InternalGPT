import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";
import { IModel } from "./useModelsList";

export interface IAssignPost {
  userId?: number;
  modelId?: number;
  departmentId?:number
}
interface IFetch {
  message: string;
  model: IModel;
}

const useAssignModel = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IAssignPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.ASSIGN_MODEL}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [`${APIEndpoint.MODELS_LIST}`],
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

export default useAssignModel;
