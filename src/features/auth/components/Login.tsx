import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { LoginForm } from "./LoginForm";

export function Login(): ReactElement {
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleOnSubmit = async (username: string, password: string) => {
    await login(username, password);
    const redirectTo = searchParams.get("redirectTo") || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <main id="login-page" className="g-container">
      <LoginForm onSubmit={handleOnSubmit} />
    </main>
  );
}
