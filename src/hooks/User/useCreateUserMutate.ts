import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";
import { IUser } from "./useUsersList";

export interface IPost {
  name: string;
  email: string;
  password: string;
  department: string;
}
interface IFetch {
  message: string;
  model: IUser;
}

const useCreateUserMutate = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.USERS_ADD}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: [`${APIEndpoint.USERS_LIST}`],
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

export default useCreateUserMutate;
