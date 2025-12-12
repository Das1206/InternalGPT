import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";
import { IAssistant } from "./useAssistantList";

export interface IAssignAssistantPost {
  userId?: number;
  assistantId?: number;
  departmentId?: number;
  assignId: number;
}
interface IFetch {
  message: string;
  model: IAssistant;
}

const useAssignAssistant = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IAssignAssistantPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.ASSING_ASSISTANT}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [`${APIEndpoint.ASSIGN_ASSISTANT_LIST}`],
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

export default useAssignAssistant;
