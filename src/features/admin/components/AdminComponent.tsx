import { ReactElement, useState } from "react";
import { ClaimsResponse, IRegisterUser, IUpdateUser } from "../types";
import { UserForm } from "./UserFormComponent";
import { useLoaderData } from "react-router";
import { FetchForm } from "./FetchUserComponent";
import { AssignCourse } from "./AssignCourse";


export function AdminComponent(): ReactElement {
  const user = useLoaderData() as ClaimsResponse;
  const [regForm, setRegForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [assignForm, setAssignForm] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<IUpdateUser | null>(null);

  const newUser: IRegisterUser = {
  userName: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  role: ""
};

const emptyUser: IUpdateUser = {
  id:"",
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  role: ""
};


  return (

    <main id="teacher" className="g-container">
          <h2>Teachers Admin Panel</h2>
          <p>Welcome, {user.role}</p>
          <p>Your email: {user.email}</p>
          <p/><br/>
          
          <button onClick={() => {setRegForm(!regForm)}} disabled={editForm}>
            {regForm ? "Exit Registration" : "Register New User"}
          </button>

          <button onClick={() => setEditForm(!editForm)} disabled={regForm}>
            {editForm ? "Exit Update" : "Update Existing User"}
          </button>

          {(editForm || assignForm) && !regForm && (<FetchForm onFetchedUser={(fetchedUser) => {setFetchedUser(fetchedUser)}}/>)}
          {regForm && !editForm && <UserForm onClose={() => setRegForm(false)} action = "register" user={newUser}/>}
          {editForm && fetchedUser && (<UserForm onClose={() => {setEditForm(false); setFetchedUser(emptyUser)}} action="edit" user={fetchedUser}/>)}
        </main> 
  );
}
