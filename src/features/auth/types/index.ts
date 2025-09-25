export interface IUser {
  id: string;
  role: string;
  username: string;
  // Add other user fields as needed
}

export interface Course {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO string or DateOnly
  endDate: string;   // ISO string or DateOnly
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