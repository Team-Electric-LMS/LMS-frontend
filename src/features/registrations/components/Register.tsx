import { FormEventHandler, ReactElement, useState } from 'react';
import { RegistrationReq } from '../api';


interface RegistrationProps {
  onClose: () => void;
}

export function Registration({ onClose }: RegistrationProps): ReactElement {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [role, setRole] = useState<string>(''); 


  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();


      await RegistrationReq(password, email, username, role, firstname, lastname);
      onClose();
  }

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Register user</legend>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text" required 
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password} required 
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email} required 
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
          <select value={role} id="role" onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="guest">Guest</option>
          </select>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
