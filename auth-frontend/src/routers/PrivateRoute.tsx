import { RouteObject } from "react-router-dom";
import { RouteConstant } from "../utils/enum/RouteConstant";
import PrivateRoute from "../utils/providers/PrivateRoute";
import Dashboard from "../pages/private/dashboard/Dashboard";

export const privateRoutes: RouteObject[] = [
  {
    path: RouteConstant.DASHBOARD,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
];
