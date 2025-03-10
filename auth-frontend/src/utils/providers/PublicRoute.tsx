import { JSX, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { RouteConstant } from "../enum/RouteConstant";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { isLoggedIn } = useAuthentication();
  return isLoggedIn ? (
    <Navigate to={RouteConstant.DASHBOARD} replace />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;
