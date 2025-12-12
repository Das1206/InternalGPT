import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";

interface IResponse {
  message: string;
}
const useDeleteModelById = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();
  return useMutation<IResponse, AxiosError, number | undefined, unknown>({
    mutationFn: (data) => {
      return apiClient.delete(`${APIEndpoint.MODELS_DELETE}/${data}`);
    },
    onSuccess: (data) => {
      toast.success(data.message || " Model Deleted.");
      queryClient.invalidateQueries({ queryKey: [APIEndpoint.MODELS_LIST] });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      console.log(err.response?.data);
      toast.error(
        (err.response?.data.message as string) || "Something went wrong"
      );
    },
  });
};

export default useDeleteModelById;
