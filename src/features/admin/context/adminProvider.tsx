import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { AdminContext } from ".";
import { useAuthContext } from "../../auth/hooks";
import { Navigate } from "react-router-dom";
import { hasTokenExpired } from "../../auth/utilities";
import { refreshTokens } from "../../auth/api";
import { ITokens } from "../../auth/types";

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps): ReactElement {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string>();

  const { user: authUser } = useAuthContext();
  const role = authUser?.role?.toLowerCase();


   const refreshTokenIfNeeded = async () => {
    try {
      const raw = localStorage.getItem("tokens");
      if (!raw) return;

      const tokens = JSON.parse(raw) as ITokens;
      if (hasTokenExpired(tokens.accessToken)) {
        const refreshed = await refreshTokens(tokens.accessToken, tokens.refreshToken);
        localStorage.setItem("tokens", JSON.stringify(refreshed));

        // update state if token changed
        setToken(prev => (prev !== refreshed.accessToken ? refreshed.accessToken : prev));
      } else {
        setToken(prev => (prev !== tokens.accessToken ? tokens.accessToken : prev));
      }

    } catch (err) {
      console.error("Failed to refresh token", err);
    }
  };

  useEffect(() => {
    refreshTokenIfNeeded();
    const interval = setInterval(refreshTokenIfNeeded, 0.5 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

    if (role === "student") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <AdminContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};