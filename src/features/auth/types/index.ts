export interface IUser {
  id: string;
  // Add other user fields as needed
}

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user?: IUser;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
