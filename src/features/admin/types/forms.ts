import { IUser } from "./users";

export interface BaseFormProps {
  legend: string;
  onClose: () => void;
}

export interface FetchFormProps {
  onFetchedUser: (user: IUser) => void;
}

export interface AdminFormProps {
  legend: string;
  onUserReturned: (user: IUser) => void;
  onClose: () => void;
}

export interface AssignCourseProps {
  legend: string;
  onClose: () => void;
}

export interface InputProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export interface TextInputProps extends InputProps {
  type?: string;
}

export interface SelectInputProps extends InputProps {
  options: string[];
}
