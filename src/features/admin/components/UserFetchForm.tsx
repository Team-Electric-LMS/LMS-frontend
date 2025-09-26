import { FormEventHandler, ReactElement, useState } from "react";
import { fetchUserExtended } from "../api";
import "../css/styles.css";
import { useAdmin } from "../context/adminProvider";


export function FetchForm(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const { setUser, token } = useAdmin();


  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token available");
      return;
    }
      try {
        const fetchedUser = await fetchUserExtended(username, token);

        if (!fetchedUser) {
          setNotFound(true);
        } else {
          setNotFound(false);
          if (!fetchedUser.role == null) fetchedUser.role = "";
          setUser(fetchedUser);
        }
      } catch (err) {
        console.error("Error fetching user", err);
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
