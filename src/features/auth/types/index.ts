export interface IUser {
  id: string;
  role: string;
  // Add other user fields as needed
}

export interface Course {
  id: string;
  name: string;
  // Additional fields for course
}

export interface IStudentCourseInfo {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  teacherName: string;
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