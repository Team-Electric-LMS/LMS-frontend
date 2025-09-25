import { ReactElement } from "react";
import { IUser } from "../types";
import "../css/styles.css";

interface UserDisplayProps {
  userdata: IUser | null;
  onClose: () => void;
  onEdit: () => void;
}

export function UserDisplay({ userdata, onClose, onEdit }: UserDisplayProps): ReactElement {
  if (!userdata) {
    return (
      <div className="user-display">
        <p>No user selected.</p>
      </div>
    );
  }

  return (
    <div className="user-display form">
      <h3>User Information</h3>
      <ul>
        <li>Username: {userdata.userName}</li>
        <li>Email: {userdata.email}</li>
        <li>First Name: {userdata.firstName}</li>
        <li>Last Name: {userdata.lastName}</li>
        <li>Role: {userdata.role ?? "No role assigned"}</li>
      </ul>
      <button onClick={onClose}>Close</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}