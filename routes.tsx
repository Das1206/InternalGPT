/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminLayout from "./src/components/Layout/AdminLayout";
import Layout from "./src/components/Layout/Layout";
import { AdminRoutes, Routes, TokenKey } from "./src/constants";
import AllModels from "./src/pages/Admin/AllModels";
import Assistants from "./src/pages/Admin/Assistants";
import Usage from "./src/pages/Admin/Usage";
import Users from "./src/pages/Admin/Users";
import Chat from "./src/pages/Chat";
import Login from "./src/pages/Login";
import Models from "./src/pages/Models";
import Departments from "./src/pages/Admin/Departments";
import AssignedAssistants from "./src/pages/Admin/AssignedAssistants";
import AssignedModels from "./src/pages/Admin/AssignedModels";

export interface Route {
  index?: boolean;
  path: string;
  element: React.ReactElement;
  name?: string;
}

const isToken = () => !!localStorage.getItem(TokenKey);

const LoginElement = isToken() ? (
  <Navigate to={`/app/${Routes.CHATS}`} replace />
) : (
  <Login />
);

export const routes: Route[] = [
  { path: Routes.CHATS, element: <Chat /> },
  { path: Routes.MODELS, element: <Models /> },
  // ...(isAdmin() ? [{ path: "users", element: <Users />, name: "Users" }] : []),
];

export const adminRoutes: Route[] = [
  { path: AdminRoutes.USAGE, element: <Usage /> },
  { path: AdminRoutes.ASSISTANTS, element: <Assistants /> },
  { path: AdminRoutes.ASSIGNED_ASSISTANTS, element: <AssignedAssistants /> },
  { path: AdminRoutes.USERS, element: <Users /> },
  { path: AdminRoutes.DEPARTMENTS, element: <Departments /> },
  { path: AdminRoutes.MODELS, element: <AllModels /> },
  { path: AdminRoutes.ASSIGNED_MODELS, element: <AssignedModels /> }
];

const router = createBrowserRouter([
  { path: "/", element: LoginElement },
  { path: Routes.LOGIN, element: LoginElement },
  isToken()
    ? {
      path: "app",
      element: <Layout />,
      children: routes,
    }
    : {},

  {
    path: "admin",
    element: <AdminLayout />, // dashboard layout
    children: adminRoutes, // dash board routes
  },
  { path: "*", element: <h1>Not found</h1> },
]);

export default router;
