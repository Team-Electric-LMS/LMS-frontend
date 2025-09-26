import { ReactElement, useState } from "react";
import { AdminState } from "../types";
import { FetchForm } from "./UserFetchForm";
import { AssignCourse } from "./UserAssignForm";
import { UserDisplay } from "./FetchResults";
import { AdminForm } from "./UserAdminForm";
import "../css/admin.css";
import { useAdmin } from "../context/adminProvider";

export function AdminPage(): ReactElement {
  const [admin, setAdmin] = useState<AdminState>({
    fetch: false,
    display: false,
    register: false,
    editMode: false,
    assign: false,
  });

  const { user, setUser } = useAdmin();

  return (
    <main className="admin-page g-container">
      <h1>Teachers Admin Panel</h1>
      <nav className="nav-panel">
        <button
          onClick={() => {
            setUser(undefined);
            setAdmin({ ...admin, fetch: !admin.fetch });
          }}
          disabled={admin.register}
        >
          Find a User
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setAdmin({ ...admin, register: !admin.register});
          }}
          disabled={admin.editMode}
        >
          Register New User
        </button>
      </nav>
      <div className="admin-area">
        <div className="left-side">
          {admin.fetch && !admin.register && (
            <FetchForm
              legend={"Find a student"}
              onClose={() => setAdmin({ ...admin, fetch: false })}
            />
          )}
          {user && !admin.register && (
            <UserDisplay
              legend="User Info"
              onEdit={() => setAdmin({ ...admin, editMode: true })}
              onClose={() => setAdmin({ ...admin, display: false })}
              onReassign={() =>
                setAdmin({ ...admin, assign: true, editMode: false })
              }
            />
          )}
        </div>
        <div className="right-side">
          {admin.editMode && !admin.register && (
            <AdminForm
              legend="Edit User"
              onClose={() => setAdmin({ ...admin, editMode: false })}
            />
          )}
          {admin.register && (
            <AdminForm
              legend="Register User"
              onClose={() =>
                setAdmin({ ...admin, register: false, display: true })
              }
            />
          )}
        </div>
        <div>
          {admin.assign && (
            <AssignCourse
              legend="Assign Course"
              onClose={() => setAdmin({ ...admin, assign: false })}
            />
          )}
        </div>
      </div>
    </main>
  );
}
