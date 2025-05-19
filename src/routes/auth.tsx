import { lazy } from "react";
import { IRoute } from "./types";

const Login = lazy(() => import("pages/auth/login"));

const auhtRoutes: IRoute[] = [
  {
    key: "login",
    path: "login",
    component: <Login />,
  },
];

export default auhtRoutes;
