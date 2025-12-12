import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";

export interface IData {
  title: string | null | undefined;
  chatId: number | undefined;
}
const useUpdateChatTitle = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient();
  return useMutation({
    mutationFn: (data: IData) => {
      return apiClient.post(`${APIEndpoint.CHAT_TITLE_UPDATE}`, data);
    },
    onSuccess: (data) => {
      toast.success(data.message || " Chat Updated");
      queryClient.invalidateQueries({ queryKey: [APIEndpoint.CHATS_LIST] });
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

export default useUpdateChatTitle;
