import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
interface ChatStoreState {
  chatId: number | undefined;
  modelId: number | undefined;
  assistantId: number | undefined;
  setChatId: (newChatId: number | undefined) => void;
  setModelId: (id: number | undefined) => void;
  setAssistantId: (id: number | undefined) => void;
}

const useChatStore = create<ChatStoreState>((set) => ({
  chatId: undefined,
  modelId: 0,
  assistantId: 0,
  setChatId: (newChatId) => {
    set(() => ({ chatId: newChatId! }));
  },
  setModelId: (id) => set(() => ({ modelId: id, assistantId: 0 })),
  setAssistantId: (id) => set(() => ({ assistantId: id, modelId: 0 })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Chat Store", useChatStore);
}

export default useChatStore;
