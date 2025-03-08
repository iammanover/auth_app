import { RouteObject } from "react-router-dom";
import { RouteConstant } from "../utils/enum/RouteConstant";
import PublicRoute from "../utils/providers/PublicRoute";
import Login from "../pages/public/login/Login";
import Registration from "../pages/public/registraion/Registration";

export const publicRoutes: RouteObject[] = [
  {
    path: RouteConstant.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: RouteConstant.REGISTRATION,
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },
];
