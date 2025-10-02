import { ReactElement } from "react";
import "../css/styles.css";
import { useAdminContext } from "../context/adminProvider";

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
  const { user, setUser } = useAdminContext();

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
            <p><strong>Username:</strong> {user.userName}</p>
           <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Role:</strong> {user.role ?? "No role assigned"}</p>
            
              {user.role == null ? (
                <>
                  <strong>Course:</strong> Assign a role first
                </>
              ) : user.role === "Teacher" ? (
                <>
                  <strong>Courses Taught:</strong>{" "}
                  {user.coursesTaught && user.coursesTaught.length > 0 ? (
                    <ul>
                      {user.coursesTaught.map((c) => (
                        <li key={c.id}>{c.name}</li>
                      ))}
                    </ul>
                  ) : (
                    "No courses assigned"
                  )}
                </>
              ) : (
                <>
                  <strong>Course:</strong>{" "}
                  {user.course ? user.course.name : "No course assigned"}
                </>
              )}
            
          </ul>
          <button type="button" onClick={() => setUser(undefined)}>
            Close Info
          </button>
          <button type="button" onClick={onEdit}>
            Edit Profile
          </button>
          <button
            type="button"
            onClick={onReassign}
            disabled={user.role == null}
          >
            Assign Course
          </button>
        </fieldset>
      </form>
    </main>
  );
}
