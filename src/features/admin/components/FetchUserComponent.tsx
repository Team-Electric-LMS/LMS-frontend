import { FormEventHandler, ReactElement, useState } from "react";
import { IUser } from "../types";
import { fetchUserByUserName } from "../api";
import "../css/styles.css";

interface FormProps {
  onFetchedUser: (user: IUser) => void;
}

const emptyUser: IUser = {
  id:"",
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  role: ""
};

export function FetchForm({ onFetchedUser }: FormProps): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const raw = localStorage.getItem("tokens");
    const tokens = raw ? JSON.parse(raw) : null;

    if (tokens?.accessToken) {
      try {
        const updUser: IUser | null = await fetchUserByUserName(
          username,
          tokens.accessToken
        );
        if (!updUser) {
          console.log("User not found");
          setNotFound(true)
          onFetchedUser(emptyUser);
        } else {
          setNotFound(false)
          if (updUser.role == null) updUser.role = "";
          console.log("User fetched:", updUser);
          onFetchedUser(updUser);
        }
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Find a student</legend>
          <label htmlFor="username">E-mail</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => onFetchedUser(emptyUser)}
            type="text"
            required
          />
          <button type="submit">Find User</button>
          {notFound && <p style={{ color: "red" }}> User not found</p>}
        </fieldset>
      </form>
    </main>
  );
}
