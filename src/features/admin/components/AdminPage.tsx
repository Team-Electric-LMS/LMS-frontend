import { ReactElement, useState } from "react";
import { AdminPanelState } from "../types";
import { IModule } from "../types/modules";
import { FetchForm } from "./UserFetchForm";
import { AssignCourse } from "./UserAssignForm";
import { UserDisplay } from "./FetchResults";
import { AdminForm } from "./UserAdminForm";
import { ModuleForm } from "./ModuleForm";
import { CourseDropdown } from "./CourseDropdown";
import { ModuleList } from "./ModuleList";
import { useAdminContext } from "../context/adminProvider";
import { CourseCreate } from "../courses/components";
import "../css/admin.css";
import { DocumentUploadForm } from "../../shared/components/Documents/DocumentUpload";
import { ActivityForm } from "./activities/ActivityEditForm";

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

  const [editModule, setEditModule] = useState<IModule | undefined>(undefined); 
  const [selectedCourse, setSelectedCourse] = useState<any>(undefined);
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
          {/* ModuleForm only, no course dropdown or module list here */}
          {showModuleForm && (
            <div style={{ marginTop: '1.5rem' }}>
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
                selectedCourse={selectedCourse}
              />
            </div>
          )}
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
          {/* Show course dropdown and module list only when creating a new module */}
          {showModuleForm && selectedCourse && (
            <ModuleList
              courseId={selectedCourse.id}
              token={token ?? ""}
              onEdit={mod => {
                setEditModule(mod);
                setShowModuleForm(true);
                if (mod.courseId && (!selectedCourse || selectedCourse.id !== mod.courseId)) {
                  setSelectedCourse({ ...selectedCourse, id: mod.courseId });
                }
              }}
            />
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
