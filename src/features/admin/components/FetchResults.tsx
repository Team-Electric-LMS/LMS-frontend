import { ReactElement } from "react";
import "../css/styles.css";
import { useAdmin } from "../context/adminProvider";

interface UserDisplayProps {
  legend: string;
  onClose: () => void;
  onEdit: () => void;
  onReassign: () => void;
}

export function UserDisplay({
  legend,
  onEdit,
  onReassign,
}: UserDisplayProps): ReactElement {
  const { user, setUser } = useAdmin();

  if (!user) {
    return (
      <div className="user-display">
        <p>No user selected.</p>
      </div>
    );
  }
  return (
    <main className="form-page">
      <form className="form">
        <fieldset>
          <legend>{legend}</legend>
          <ul>
            <li>Username: {user.userName}</li>
            <li>Email: {user.email}</li>
            <li>First Name: {user.firstName}</li>
            <li>Last Name: {user.lastName}</li>
            <li>Role: {user.role ?? "No role assigned"}</li>
            <li>
              Course:{" "}
              {user.role === "Teacher"
                ? "Not shown for teachers"
                : user.course
                ? `${user.course.name} (${user.course.id})`
                : "No course assigned"}
            </li>
          </ul>
          <button type="button" onClick={() => setUser(undefined)}>
            Close
          </button>
          <button type="button" onClick={onEdit}>
            Edit
          </button>
          <button
            type="button"
            onClick={onReassign}
            disabled={user.role == "Teacher"}
          >
            Reassign
          </button>
        </fieldset>
      </form>
    </main>
  );
}
