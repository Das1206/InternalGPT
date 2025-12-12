import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../services/api-client";
import { Routes, TokenKey, UserKey } from "../constants";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface ILoginPost {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    department: string;
    role: string;
  };
}
const useLogin = () =>
  useMutation<ILoginResponse, AxiosError, ILoginPost>({
    mutationFn: (data: ILoginPost) =>
      axiosInstance.post("user/auth", data).then((res) => res.data),
    onSuccess: (res) => {
      localStorage.setItem(TokenKey, res.token);
      localStorage.setItem(UserKey, JSON.stringify(res.user));

      toast.success("Successfully Login");

      if (res.token) window.location.href = `app/${Routes.CHATS}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error((error.response?.data?.message as string) || "Login Failed.");
    },
    retry: 0,
  });

export default useLogin;
