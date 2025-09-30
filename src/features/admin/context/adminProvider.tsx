import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { AdminContext } from ".";
import { useAuthContext } from "../../auth/hooks";
import { Navigate } from "react-router-dom";

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps): ReactElement {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string>();

  const { user: authUser } = useAuthContext();
  const role = authUser?.role?.toLowerCase();


  useEffect(() => {
    try {
      const raw = localStorage.getItem("tokens");
      if (raw) {
        const parsed = JSON.parse(raw);
        setToken(parsed.accessToken); // <-- set token in context
      }
    } catch (err) {
      console.error("Failed to parse token from localStorage", err);
    }
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