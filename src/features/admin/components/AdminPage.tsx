import { ReactElement, useState } from "react";
import { AdminPanelState } from "../types";
import { IModule } from "../types/modules";
import { FetchForm } from "./UserFetchForm";
import { AssignCourse } from "./UserAssignForm";
import { UserDisplay } from "./FetchResults";
import { AdminForm } from "./UserAdminForm";
import { ModuleForm } from "./ModuleForm";
import { useAdminContext } from "../context/adminProvider";
import { CourseCreate } from "../courses/components";
import "../css/admin.css";
import { DocumentUploadForm } from "../../shared/components/Documents/DocumentUpload";
import { ActivityForm } from "./activities/ActivityEditForm";
import { CourseArchive } from "./ArchivePage";

export function AdminPage(): ReactElement {
  const [adminPanel, setAdminPanel] = useState<AdminPanelState>({
    fetch: true,
    display: false,
    register: false,
    editMode: false,
    assign: false,
  });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showUploadDocument, setshowUploadDocument] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);

  const [editModule, setEditModule] = useState<IModule | undefined>(undefined); // For editing existing module
  const { user, setUser, token } = useAdminContext();

  return (
    <main className="admin-page g-container">
      <h1>Admin Panel</h1>
      <nav className="nav-panel">
        <button
          onClick={() => {
            setUser(undefined);
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: true,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Find a User
        </button>
        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowActivityForm(false);
            setUser(undefined);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: true,
              editMode: false,
              assign: false,
            });
          }}
        >
          Register New User
        </button>
        <button
          onClick={() => {
            setShowCourseForm(true);
            setShowModuleForm(false);
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Register New Course
        </button>
        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(true);
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Create New Module
        </button>

        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowActivityForm(true);
            setShowModuleForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Create New Activity
        </button>

        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowActivityForm(false);
            setShowModuleForm(false);
            setshowUploadDocument(true);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Upload Document
        </button>
        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowActivityForm(false);
            setShowModuleForm(false);
            setshowUploadDocument(false);
            setOpenArchive(true);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
            });
          }}
        >
          Open Archive
        </button>
      </nav>
      <div className="admin-area">
        <div className="left-side">
          {adminPanel.fetch && !adminPanel.register && (
            <FetchForm
              legend={"Find an account"}
              onClose={() => setAdminPanel({ ...adminPanel, fetch: false })}
            />
          )}
          {user && !adminPanel.register && (
            <UserDisplay
              legend="User Info"
              onEdit={() => setAdminPanel({ ...adminPanel, editMode: true })}
              onClose={() => setAdminPanel({ ...adminPanel, display: false })}
              onReassign={() =>
                setAdminPanel({ ...adminPanel, assign: true, editMode: false })
              }
            />
          )}
          {openArchive && <CourseArchive /> }
        </div>
        <div className="right-side">
          {showUploadDocument && (
            <DocumentUploadForm legend={"Upload document"} token={token!} />
          )}

          {adminPanel.editMode && !adminPanel.register && (
            <AdminForm
              legend="Edit User"
              onClose={() => setAdminPanel({ ...adminPanel, editMode: false })}
            />
          )}
          {adminPanel.register && (
            <AdminForm
              legend="Register User"
              onClose={() =>
                setAdminPanel({ ...adminPanel, register: false, display: true })
              }
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
          {showActivityForm && (
            <div style={{ flex: 1 }}>
              <ActivityForm
                legend={"Manage Activity"}
                onClose={() => {
                  setShowActivityForm(false);
                  setEditModule(undefined);
                }}
                onSuccess={() => {
                  setEditModule(undefined);
                }}
              />
            </div>
          )}
        </div>
        <div>
          {adminPanel.assign && (
            <AssignCourse
              legend="Assign Course"
              onClose={() => setAdminPanel({ ...adminPanel, assign: false })}
            />
          )}
          {showCourseForm && <CourseCreate />}
        </div>
      </div>
    </main>
  );
}
