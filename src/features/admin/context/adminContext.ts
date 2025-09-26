import { createContext } from 'react';
import { IUser } from '../types';

export const AdminContext = createContext<IAdminContext>({} as IAdminContext);

export interface IAdminContext {
  user: IUser | undefined;
  setUser: (user: IUser | undefined) => void;
  token?: string;
  setToken: (token: string) => void;
}

