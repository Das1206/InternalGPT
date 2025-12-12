import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";

interface IResponse {
  message: string;
}
const useDeleteDepartmentById = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();
  return useMutation<IResponse, AxiosError, number | undefined, unknown>({
    mutationFn: (data) => {
      return apiClient.delete(`${APIEndpoint.DEPARTMENT_DELETE}/${data}`);
    },
    onSuccess: (data) => {
      toast.success(data.message || " Department Deleted.");
      queryClient.invalidateQueries({ queryKey: [APIEndpoint.DEPARTMENT_LIST] });
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

export default useDeleteDepartmentById;
