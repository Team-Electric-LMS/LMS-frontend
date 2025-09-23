export interface IRegisterUser {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface IUpdateUser {
  id: string;
  email: string;
  userName: string;
  role: string | null;
  firstName: string;
  lastName: string;
}

export interface IUserLoader {
  companies: Promise<IRegisterUser[]>;
}

export interface ClaimsResponse {
  id: string;
  email: string;
  role: "Student" | "Teacher";
}