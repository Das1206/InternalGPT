/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { APIEndpoint } from "../../constants";
import useChatStore from "../../store/ChatStore";
import { ICHatHistory } from "./useChatHistory";

interface IPost {
  chatId?: number;
  modelId?: number;
  assistantId?: number;
  query: string;
  imageUrl?: string;
}
interface IFetch {
  chatId: number;
  result: {
    role: "bot" | "user";
    content: string;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
function UpdateCache(
  queryClient: ReturnType<typeof useQueryClient>,
  endpoint: string,
  role: "bot" | "user",
  mesg: string,
  type: "text"
) {
  queryClient.setQueryData([endpoint], (old: ICHatHistory | undefined) => {
    old.chats = old?.chats.filter((c) => c?.content !== "");
    return {
      ...old,
      chats: [
        ...(old?.chats || []),
        {
          id: (old?.chats?.length || 0) + 1,
          role: role,
          type: type,
          content: mesg,
          createdAt: new Date(),
        },
      ],
    };
  });
}

const useChatMutate = () => {
  const queryClient = useQueryClient();
  const storeChatId = useChatStore((s) => s.chatId);
  const setChatId = useChatStore((s) => s.setChatId);
  const apiClient = new APIClient();

  return useMutation<IFetch, AxiosError, IPost, unknown>({
    mutationFn: (data) => {
      return apiClient.post(`${APIEndpoint.CHATS_CREATE}`, data);
    },
    onMutate: (data) => {
      UpdateCache(
        queryClient,
        `${APIEndpoint.CHAT_HISTORY}/${data.chatId}`,
        "user",
        data.query
        // (data.imageUrl) ? "image" : "text"
      );
      UpdateCache(
        queryClient,
        `${APIEndpoint.CHAT_HISTORY}/${data.chatId}`,
        "bot",
        ""
      );
    },

    onSuccess: (data) => {
      setChatId(data.chatId);
      queryClient.invalidateQueries({
        queryKey: [`${APIEndpoint.CHAT_HISTORY}/${data.chatId}`],
      });

      queryClient.setQueryData(
        ["chats/history/undefined"],
        (old: ICHatHistory | undefined) => {
          return {
            ...old,
            chats: [],
          };
        }
      );

      if (data.chatId !== storeChatId) {
        queryClient.invalidateQueries({ queryKey: [APIEndpoint.CHATS_LIST] });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any, variables) => {
      UpdateCache(
        queryClient,
        `${APIEndpoint.CHAT_HISTORY}/${variables.chatId}`,
        "bot",
        (err.response?.data.message as string) || "Something went wrong"
      ),
        toast.error(
          (err.response?.data.message as string) || "Something went wrong"
        );
    },
  });
};

export default useChatMutate;
