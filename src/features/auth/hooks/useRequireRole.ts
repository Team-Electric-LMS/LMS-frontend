import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { useEffect } from "react";

interface UseRequireRoleProps {
  role: string;
  redirectTo?: string;
}

export const useRequireRole = ({ role, redirectTo = "/dashboard" }: UseRequireRoleProps) => {
  const authContext = useAuthContext();
  const userRole = authContext?.user?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole && userRole.toLowerCase() !== role) {
      navigate(redirectTo);
    }
  }, [userRole, role, redirectTo, navigate]);
};
