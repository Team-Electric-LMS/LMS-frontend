import { FormEventHandler, ReactElement, useState } from "react";
import { IUpdateUser } from "../types";
import { fetchUserByUserName } from "../api";

interface FormProps {
  onFetchedUser: (user: IUpdateUser) => void;
}

export function FetchForm({ onFetchedUser }: FormProps): ReactElement {
  const [username, setUsername] = useState<string>("");

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const raw = localStorage.getItem("tokens");
    const tokens = raw ? JSON.parse(raw) : null;

    if (tokens?.accessToken) {
      try {
        const updUser: IUpdateUser = await fetchUserByUserName(username, tokens.accessToken);
        if (updUser.role == null) updUser.role=""
        console.log("User fetched:", updUser);
        onFetchedUser(updUser);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }
  };

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Fetch user</legend>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
