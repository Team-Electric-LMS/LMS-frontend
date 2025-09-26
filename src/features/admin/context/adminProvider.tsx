import { ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { AdminContext } from ".";

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps): ReactElement {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string>();


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
  
  return (
    <AdminContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};