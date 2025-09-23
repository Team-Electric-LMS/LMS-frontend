import { FormEventHandler, ReactElement, useState, useEffect } from "react";
import { checkEmailExists, EditUserReq, RegistrationReq } from "../api";
import { IUpdateUser, IRegisterUser } from "../types";

interface FormProps {
  onClose: () => void;
  action: "register" | "edit";
  user: IUpdateUser | IRegisterUser;
}

export function UserForm({
  onClose,
  action,
  user,
}: FormProps): ReactElement {

  const [username, setUsername] = useState<string>(user.userName);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(user.email);
  const [firstname, setFirstName] = useState<string>(user.firstName);
  const [lastname, setLastName] = useState<string>(user.lastName);
  const [role, setRole] = useState<string>(user.role != null ? user.role : "");

  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [patternOk, setPatternOk] = useState<boolean>(false);
  const [sameEmail, setSameEmail] = useState<boolean>(false);

  const raw = localStorage.getItem("tokens");
    const tokens = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    setUsername(user.userName);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole(user.role ?? "");
  }, [user]);

  function validateEmailPattern(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

   
const handleOnBlur = async (email: string) => {

  setPatternOk(validateEmailPattern(email));
  setSameEmail(email == user.email);

  if (patternOk) setEmailAvailable(!await checkEmailExists(email, tokens.accessToken))

  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (action === "register" && emailAvailable && patternOk) {
      try {
        const newUser: IRegisterUser = await RegistrationReq(
          password,
          email,
          username,
          role,
          firstname,
          lastname
        );
        console.log("User registered:", newUser);
        onClose();
      } catch (err) {
        console.error("Error registering user", err);
      }
    }
    else if (action === "edit" && (emailAvailable || sameEmail)) {
      try {
        const updUser: IUpdateUser = await EditUserReq(
          (user as IUpdateUser).id,
          email,
          username,
          role,
          firstname,
          lastname
        );
        console.log("User updated:", updUser);
        onClose();
      } catch (err) {
        
        console.error("Error updating a user", err);
      }
    }

  };

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>{action === "register" ? "Register" : "Edit"} User</legend>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
          />
          {action =="register" &&
          (<div><label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            required
          /></div>)}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => {setEmail(e.target.value)}}
            onBlur={() => handleOnBlur(email)}
            type="text"
            value={email}
            required
          />
          <label htmlFor="firstname">FirstName</label>
          <input
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstname}
          />
          <label htmlFor="lastname">LastName</label>
          <input
            id="lastname"
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            value={lastname}
          />
          <label htmlFor="role">Role</label>
          <select
            value={role}
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={role}>{role}</option> 
            <option value="">-- Select a role --</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
                {!sameEmail && email !="" && (patternOk ? <p style={{ color: "green" }}> Looks like a real email</p> : <p style={{ color: "red" }}>Please enter a real email</p>)}
                {!sameEmail && patternOk && (emailAvailable ? <p style={{ color: "green" }}>Email is available</p> : <p style={{ color: "red" }}>Email is already taken</p>)}
                {sameEmail && <p style={{ color: "green" }}>Keeping the same email.</p> }
                
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
