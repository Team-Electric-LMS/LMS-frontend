import { FormEventHandler, ReactElement, useState, useEffect } from "react";
import { checkEmailExists, EditUserReq, RegistrationReq } from "../api";
import { IUser, IRegisterUser } from "../types";
import "../css/styles.css";
import { validateEmailPattern } from "../helpers/validateEmail";

interface FormProps {
  legend: string;
  onClose: () => void;
  action: "register" | "edit";
  userdata?: IUser | IRegisterUser;
}

export function UserForm({ legend, onClose, action, userdata }: FormProps): ReactElement {
  
  const [form, setForm] = useState({
    username: userdata ? userdata.userName : "",
    email: userdata ? userdata.email : "",
    password: "",
    firstname: userdata ? userdata.firstName : "",
    lastname: userdata ? userdata.lastName : "",
    role: userdata?.role ? userdata.role : "",
  });

  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [patternOk, setPatternOk] = useState<boolean>(false);
  const [sameEmail, setSameEmail] = useState<boolean>(false);
  const [emailChanged, setemailChanged] = useState<boolean>(false);

  const raw = localStorage.getItem("tokens");
  const tokens = raw ? JSON.parse(raw) : null;

  if (action == "edit") useEffect(() => {
    setForm({
      username: userdata!.userName,
      password: "",
      email: userdata!.email,
      firstname: userdata!.firstName,
      lastname: userdata!.lastName,
      role: userdata!.role ?? "",
    });
  }, [userdata]);

  const emptyForm = {
  username: "",
  password: "",
  email: "",
  firstname: "",
  lastname: "",
  role: "",
};

  const handleOnBlur = async (email: string) => {
    setemailChanged(true);
    setPatternOk(validateEmailPattern(email));
    setSameEmail(email == userdata?.email);

    if (patternOk)
      setEmailAvailable(!(await checkEmailExists(email, tokens.accessToken)));
  };

  async function registerUser() {
  await RegistrationReq(
    form.password,
    form.email,
    form.username,
    form.role,
    form.firstname,
    form.lastname
  );
}

async function updateUser() {
  await EditUserReq(
    (userdata as IUser).id,
    form.email,
    form.username,
    form.role,
    form.firstname,
    form.lastname
  );
}

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (action === "register" && emailAvailable && patternOk) await registerUser()
    else if (action === "edit" && (emailAvailable || sameEmail)) await updateUser()
    onClose();
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend> {legend}</legend>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            type="text"
            required
          />
          {action == "register" && (
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                value={form.password}
                required
              />
            </div>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => handleOnBlur(form.email)}
            type="text"
            value={form.email}
            required
          />
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            type="text"
            value={form.firstname}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            type="text"
            value={form.lastname}
          />
          <label htmlFor="role">Role</label>
          <select
            value={form.role}
            id="role"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">-- Select a role --</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="">No Role</option>
          </select>
          {!sameEmail && emailChanged && (patternOk ? ( 
            <p className="ok-message"> Looks like a real email</p>
            ) : (
              <p className="error-message">Please check the email</p>
            ))}
          {!sameEmail && emailChanged &&
            patternOk &&
            (emailAvailable ? (
              <p className="ok-message">Email is available</p>
            ) : (
              <p className="error-message">Email is already taken</p>
            ))}
          {sameEmail && <p className="ok-message">Keeping the same email.</p>}
          <button type="submit" disabled={sameEmail && !patternOk}>Submit</button>
          <button type="reset" onClick={() => setForm(emptyForm)}>
            Cancel
          </button>
        </fieldset>
      </form>
    </main>
  );
}
