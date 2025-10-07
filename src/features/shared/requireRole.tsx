import { ReactNode } from "react";
import { useAuthContext } from "../auth/hooks";
import { Navigate } from "react-router";

export const RequireRole = ({ roles, children }: { roles: string[]; children: ReactNode }) => {
  const { user } = useAuthContext();

  if (user && !roles.some((role) => role.toLowerCase() === user.role.toLowerCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
