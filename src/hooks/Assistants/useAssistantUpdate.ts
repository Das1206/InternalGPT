import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";
import { IAssistant } from "./useAssistantList";

interface IPost {
  name: string;
  systemPrompt: string;
  description: string;
  modelType: string;
  allowFile: boolean;
  id?: number;
}
interface IFetch {
  message: string;
  model: IAssistant;
}

const useModelUpdate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.MODELS_UPDATE}${data?.id}`, data);
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

export default useModelUpdate;
