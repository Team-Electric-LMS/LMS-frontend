export interface IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "Student" | "Teacher" | "";
}

export interface IRegisterUser extends Omit<IUser, "id"> {
  password: string;
}

export interface IUserLoader {
  users: Promise<IUser[]>;
}

export interface ClaimsResponse {
  id: string;
  email: string;
  role: "Student" | "Teacher" | "";
}