import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../model/auth.store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = useAuthStore(state => state.accessToken);
  return accessToken ? children : <Navigate to="/login" />;
};
