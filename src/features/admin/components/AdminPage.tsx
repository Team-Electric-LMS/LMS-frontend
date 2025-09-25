import { ReactElement, useState } from "react";
import { ClaimsResponse, IRegisterUser, IUser } from "../types";
import { UserForm } from "./UserFormComponent";
import { FetchForm } from "./FetchUserComponent";
import { AssignCourse } from "./AssignCourse";
import "../css/admin.css";
import { UserDisplay } from "./DisplayUser";

interface AdminState {
  fetch: boolean;
  display: boolean;
  register: boolean;
  edit: boolean;
}

export function AdminPage(): ReactElement {


  const [admin, setAdmin] = useState<AdminState>({
    fetch: false,
    display: false,
    register: false,
    edit: false
  });

  const [fetchedUser, setFetchedUser] = useState<IUser | IRegisterUser>();

  return (

        <main className="admin-page g-container">
          <h1>Teachers Admin Panel</h1>
          <nav className="navigation-panel">
          <button onClick={() => setAdmin({ ...admin, register: true })} disabled={admin.edit} >
            Register New User
          </button>
          </nav>
          <div className="admin-area">
            <div className="left-side">
              {!admin.register && (<FetchForm onFetchedUser={(fetchedUser) => {setFetchedUser(fetchedUser); setAdmin({ ...admin, display: true})}}/>)}
              {(fetchedUser && admin.display) && <UserDisplay userdata={fetchedUser as IUser} onEdit={() => setAdmin({ ...admin, edit: true })} onClose={() => setAdmin({ ...admin, display: true })} />}
            </div>
            <div className="right-side">
              {admin.register  && <UserForm legend="Register User" onClose={() => setAdmin({ ...admin, register: true })} action = "register"/>}
              {admin.edit && !admin.register && (<UserForm legend="Edit Users data" onClose={() => setAdmin({ ...admin, edit: true })} action="edit" userdata={fetchedUser}/>)}
            </div>
          </div>

        </main> 
  );
}
