import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { LoginForm } from "./LoginForm";
import { jwtDecode } from "jwt-decode";

export function Login(): ReactElement {
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  // send user to /dashboard when they login
  // dashboard component will render different things based on role
  const handleOnSubmit = async (username: string, password: string) => {
    await login(username, password);
    navigate("/dashboard", { replace: true });
  };

  return (
    <main id="login-page" className="g-container">
      <LoginForm onSubmit={handleOnSubmit} />
    </main>
  );
}
