import { ReactElement, useState } from "react";
import { AdminPanelState } from "../types";
import { IModule } from "../types/modules";
import { FetchForm } from "./UserFetchForm";
import { AssignCourse } from "./UserAssignForm";
import { UserDisplay } from "./FetchResults";
import { AdminForm } from "./UserAdminForm";
import { ModuleForm } from "./ModuleForm";
import { useAdminContext } from "../context/adminProvider";
import { CourseCreate, CourseEdit } from "../courses/components";
import "../css/admin.css";
import { CourseFetchForm } from "./CourseFetchForm";

export function AdminPage(): ReactElement {
  const [adminPanel, setAdminPanel] = useState<AdminPanelState>({
    fetch: true,
    display: false,
    register: false,
    editMode: false,
    assign: false,
    registerCourse: false,
    editCourse: false,
  });
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showFindCourse, setShowFindCourse] = useState(false);
  const [editModule, setEditModule] = useState<IModule | undefined>(undefined); // For editing existing module
  const { user, setUser, token } = useAdminContext();

  return (
    <main className="admin-page g-container">
      <h1>Admin Panel</h1>
      <nav className="nav-panel">
        <button
          onClick={() => {
            setUser(undefined);
            setShowModuleForm(false);
            setShowFindCourse(false);
            setAdminPanel({
              fetch: true,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              registerCourse: false,
              editCourse: false,
            });
          }}
        >
          Find a User
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setShowModuleForm(false);
            setShowFindCourse(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: true,
              editMode: false,
              assign: false,
              registerCourse: false,
              editCourse: false,
            });
          }}
        >
          Register New User
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setShowModuleForm(false);
            setShowFindCourse(true);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              registerCourse: false,
              editCourse: false,
            });
          }}
        >
          Find a Course
        </button>
        <button
          onClick={() => {
            setShowModuleForm(false);
            setShowFindCourse(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              registerCourse: true,
              editCourse: false,
            });
          }}
        >
          Register New Course
        </button>
        <button
          onClick={() => {
            setShowModuleForm(true);
            setShowFindCourse(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              registerCourse: false,
              editCourse: false,
            });
          }}
        >
          Create New Module
        </button>
      </nav>
      <div className="admin-area">
        <div className="left-side">
          {adminPanel.fetch && !adminPanel.register && (
            <FetchForm legend={"Find an account"} onClose={() => setAdminPanel({ ...adminPanel, fetch: false })} />
          )}
          {user && !adminPanel.register && (
            <UserDisplay
              legend="User Info"
              onEdit={() => setAdminPanel({ ...adminPanel, editMode: true })}
              onClose={() => setAdminPanel({ ...adminPanel, display: false })}
              onReassign={() => setAdminPanel({ ...adminPanel, assign: true, editMode: false })}
            />
          )}

          {showFindCourse && (
            <CourseFetchForm
              onEdit={(course) => {
                console.log(course.id);
                setAdminPanel({ ...adminPanel, editCourse: true });
              }}
            />
          )}
        </div>
        <div className="right-side">
          {adminPanel.editMode && !adminPanel.register && (
            <AdminForm legend="Edit User" onClose={() => setAdminPanel({ ...adminPanel, editMode: false })} />
          )}
          {adminPanel.register && (
            <AdminForm
              legend="Register User"
              onClose={() => setAdminPanel({ ...adminPanel, register: false, display: true })}
            />
          )}
          {showModuleForm && (
            <div style={{ flex: 1 }}>
              <ModuleForm
                token={token ?? ""}
                onClose={() => {
                  setShowModuleForm(false);
                  setEditModule(undefined);
                }}
                module={editModule}
                onSuccess={() => {
                  setEditModule(undefined);
                  // Optionally refresh module list here
                }}
              />
            </div>
          )}
        </div>
        <div>
          {adminPanel.assign && (
            <AssignCourse legend="Assign Course" onClose={() => setAdminPanel({ ...adminPanel, assign: false })} />
          )}
          {adminPanel.registerCourse && <CourseCreate />}
          {adminPanel.editCourse && <CourseEdit />}
        </div>
      </div>
    </main>
  );
}
