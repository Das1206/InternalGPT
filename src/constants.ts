export enum Routes {
  LOGIN = "/login",
  CHATS = "chats",
  MODELS = "/app/models",
}
export enum AdminRoutes {
  DASHBOARD = "/admin/dashboard",
  ASSISTANTS = "/admin/assistants",
  ASSIGNED_ASSISTANTS = "/admin/assigned-assistants",
  USAGE = "/admin/usage",
  USERS = "/admin/users",
  DEPARTMENTS = "/admin/departments",
  MODELS = "/admin/models",
  ASSIGNED_MODELS = "/admin/assigned-models",
}
export enum APIEndpoint {
  SIGN_IN = "auth/login",

  CHATS_LIST = "chats",
  CHATS_CREATE = "chats/create",
  ASSISTANT_CHATS_CREATE = "assistant/chat",
  CHAT_HISTORY = "chats/history",
  CHAT_TITLE_UPDATE = "chats/title-update",
  CLEAR_CHAT_HISTORY = "chats/clear-history",

  MODELS_LIST = "models",
  MODELS_DELETE = "models/",
  MODELS_UPDATE = "models/update/",
  FAVOURITE_MODELS = "favorite",
  MY_MODELS = "assign/model/my-models",
  ASSIGN_MODEL = "assign/model",
  ASSIGN_MODEL_LIST = "assign/assign-models",
  REMOVE_ASSIGN_MODEL = "assign/model/remove",

  ASSISTANT_LIST = "assistant",
  ASSISTANT_ADD = "assistant/add",
  ASSISTANT_DELETE = "assistant/",
  MY_ASSISTANTS = "assign/assistant/my-assistant",
  ASSING_ASSISTANT = "assign/assistant",
  REMOVE_ASSIGN_ASSISTANT = "assign/assistant/REMOVE",
  ASSIGN_ASSISTANT_LIST = "assign/assign-assistant",

  TOKEN_HISTORY = "token-history",

  USERS_LIST = "user/memebers",
  USERS_ADD = "user/add",
  USERS_DELETE = "user/",
  USER_UPDATE = "user/update-user",

  DEPARTMENT_LIST = "department",
  DEPARTMENT_ADD = "department/add",
  DEPARTMENT_DELETE = "department/",
}
export const TokenKey = "token";
export const UserKey = "user";
export const CHAT_KEY = "chat_key";

export const API_URL = import.meta.env.VITE_API_URL;
