import { FormEventHandler, ReactElement, useState } from "react";
import "../css/styles.css";
import { useAdminContext } from "../context/adminProvider";
import { FormProps } from "../types";
import { getUserByUsername } from "../helpers/getUser";


export function FetchForm({
  legend,
}: FormProps): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const {setUser, token} = useAdminContext();


  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token available");
      return;
    }
    
    const fetchedUser = await getUserByUsername(username, token);

    if (!fetchedUser) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setUser(fetchedUser);
    }
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>{legend}</legend>
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
