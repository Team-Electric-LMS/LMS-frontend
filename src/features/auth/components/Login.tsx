import { FormEventHandler, ReactElement, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { Input } from "./Input";
import { CustomError } from "../../shared/classes";

export function Login(): ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);

      const redirectTo = searchParams.get("redirectTo") || "/";
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      if (err instanceof CustomError) {
        setError("Fel e-postadress eller lösenord");
      } else {
        setError("Något gick fel. Försök igen");
      }
    } finally {
    }
  };

  return (
    <main id="login-page" className="g-container">
      <div className="login-wrapper">
        <h1>LMS</h1>
        <form className="login-form" onSubmit={handleOnSubmit}>
          <Input
            label="E-postadress"
            name="username"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus={true}
            disabled={false}
          />
          <Input
            label="Lösenord"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={false}
            disabled={false}
          />

          {error && <div className="error-message">{error}</div>}

          <Input
            label="Logga in"
            name=""
            value=""
            type="submit"
            autoFocus={false}
            disabled={!isFormValid}
          />
        </form>
      </div>
    </main>
  );
}
