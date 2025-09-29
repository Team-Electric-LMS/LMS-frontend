import { useState } from "react";
import { IUser, IUserFormInput } from "../types";
import { checkEmailTaken, EditUserReq, RegistrationReq } from "../api";
import { validateEmailPattern } from "../helpers/validateEmail";

interface UseUserFormReturn {
  form: IUserFormInput;
  setFormField: (field: keyof IUserFormInput, value: string) => void;
  checkEmail: (token: string) => Promise<void>;
  emailChanged: boolean;
  emailAvailable: boolean;
  patternValid: boolean;
  error: string | null;
  submit: (token: string) => Promise<IUser | null>;
}

export function useUserForm(user?: IUser): UseUserFormReturn {
  const [form, setForm] = useState<IUserFormInput>({
    userName: user?.userName ?? "",
    email: user?.email ?? "",
    password: "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    role: user?.role ?? "",
  });

  const [emailChanged, setEmailChanged] = useState(true);
  const [patternValid, setPatternValid] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const setFormField = (field: keyof IUserFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const checkEmail = async (token: string) => {
    const isPatternValid = validateEmailPattern(form.email);
    setPatternValid(isPatternValid);

    const isEmailChanged = !user || user.email !== form.email;
    setEmailChanged(isEmailChanged);

      if (isEmailChanged  && isPatternValid) {
        try {
          const taken = await checkEmailTaken(form.email, token);
          setEmailAvailable(!taken);
        } catch (err) {
          console.error(err);
          setEmailAvailable(false);
          setError("Failed to check email availability.");
        }
      } else {
        setEmailAvailable(true);
      }
  };

  const submit = async (token: string): Promise<IUser | null> => {
    setError(null);
    try {
      if (!patternValid) throw new Error("Invalid email format");
      if (!emailAvailable) throw new Error("Email is already taken");

      if (user) {
        return await EditUserReq({ ...user, ...form }, token);
      } else {
        return await RegistrationReq(form as IUser, token);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit form");
      return null;
    }
  };

  return {
    form,
    setFormField,
    emailAvailable,
    patternValid,
    emailChanged,
    error,
    checkEmail,
    submit,
  };
};
