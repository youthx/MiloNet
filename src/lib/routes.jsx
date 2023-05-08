import { createBrowserRouter } from "react-router-dom";

import Login from "components/Login";
import Register from "components/Register";
import Dashboard from "components/Dashboard";
import Layout from "components/Layout";
import InDev from "components/InDev";
import InvalidPage from "components/InvalidPage";
import { Comments } from "components/Post";
import Profile from "components/Profile";
import AllUsers from "components/AllUsers";

export const ROUTE_ROOT = "/";
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_DASHBOARD = "/protected/dashboard";
export const ROUTE_PROTECTED = "/protected";
export const ROUTE_USERS = "/protected/users";
export const ROUTE_PROFILE = "/protected/profile/:id";
export const ROUTE_COMMENTS = "/protected/:id/comments";
export const router = createBrowserRouter([
  { path: "*", element: <InvalidPage /> },
  { path: ROUTE_ROOT, element: <Login /> },
  { path: ROUTE_LOGIN, element: <Login /> },
  { path: ROUTE_REGISTER, element: <Register /> },
  {
    path: ROUTE_PROTECTED,
    element: <Layout />,
    children: [
      { path: ROUTE_DASHBOARD, element: <Dashboard /> },
      { path: ROUTE_USERS, element: <AllUsers /> },
      { path: ROUTE_PROFILE, element: <Profile /> },
      { path: ROUTE_COMMENTS, element: <Comments /> },
    ],
  },
]);
