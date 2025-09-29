export type Role = "Student" | "Teacher" | "";


export interface IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  course?: ICourse
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}


export interface IUserFormInput {
  userName: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: Role;
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
  role: Role;
}