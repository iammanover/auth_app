// src/routes/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Error from "../components/error/Error";
import { publicRoutes } from "./PublicRoute";
import { privateRoutes } from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
]);

export default router;
