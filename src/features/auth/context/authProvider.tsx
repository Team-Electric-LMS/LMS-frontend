import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from 'usehooks-ts';
import { AuthContext } from '.';
import { loginReq } from '../api';
import { IUser } from '../types';
import { TOKENS } from '../constants';
import { ITokens, IAuthContext } from '../types';
import { CustomError } from '../../shared/classes';

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);

  // useLocalStorage works as a useState but it is always hooked up to LS, which means, if another component updates LS, this component will update as well.
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(TOKENS, null);

  async function login(username: string, password: string) {
    try {
      const tokens = await loginReq(username, password);
      setTokens(tokens);
      // Extract user info from access token
      const decoded: any = jwtDecode(tokens.accessToken);
      const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (id && role) {
        setUser({ id, role });
      } else {
        setUser(undefined);
      }
    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error);
      }
    }
  }

  function logout() {
  clearTokens();
  setUser(undefined);
  }

  const values: IAuthContext = { isLoggedIn, login, logout, user };

  useEffect(() => {
    if (tokens === null) {
      setIsLoggedIn(false);
      setUser(undefined);
    }
    if (tokens) {
      setIsLoggedIn(true);
      // Extract user info from access token on mount/update
      const decoded: any = jwtDecode(tokens.accessToken);
      const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (id && role) {
        setUser({ id, role });
      } else {
        setUser(undefined);
      }
    }
  }, [tokens]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
