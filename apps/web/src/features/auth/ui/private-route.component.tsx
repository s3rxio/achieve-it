import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../model/auth.store";

interface PrivateRouteProps {
  children: React.ReactNode;
  forAdmin?: boolean;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children, forAdmin }) => {
  const { accessToken, user } = useAuthStore();

  if (forAdmin && !user?.isAdmin) {
    return <Navigate to={"/"} />;
  }
  return accessToken ? children : <Navigate to="/login" />;
};
