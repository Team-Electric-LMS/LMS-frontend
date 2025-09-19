import { FormEventHandler, ReactElement, useState } from "react";
import { CustomError } from "../../shared/classes";
import { Input } from "./Input";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(username, password);
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError("Fel e-postadress eller lösenord");
      } else {
        setError("Något gick fel. Försök igen");
      }
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h1>LMS</h1>
        <form className="login-form" onSubmit={handleOnSubmit}>
          <Input
            label="E-postadress"
            name="username"
            type="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            autoFocus={true}
            disabled={false}
            autoComplete="username"
          />
          <Input
            label="Lösenord"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            autoFocus={false}
            disabled={false}
            autoComplete="current-password"
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={!isFormValid}>
            Logga in
          </button>
        </form>
      </div>
    </>
  );
};
