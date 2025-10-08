import { ReactElement, useState } from "react";
import { AdminPanelState, ICourse } from "../types";
import { IModule } from "../types/modules";
import { FetchForm } from "./UserFetchForm";
import { AssignCourse } from "./UserAssignForm";
import { UserDisplay } from "./FetchResults";
import { AdminForm } from "./UserAdminForm";
import { ModuleForm } from "./ModuleForm";
import { CourseDropdown } from "./CourseDropdown";
import { ModuleList } from "./ModuleList";
import { useAdminContext } from "../context/adminProvider";
import { CourseCreate, CourseEdit } from "../courses/components";
import "../css/admin.css";
import { CourseFetchForm } from "./CourseFetchForm";
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
    editCourse: false,
  });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showFindCourse, setShowFindCourse] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showUploadDocument, setshowUploadDocument] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);

  const [editModule, setEditModule] = useState<IModule | undefined>(undefined); // For editing existing module
  const [editCourse, setEditCourse] = useState<ICourse | undefined>(undefined);
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
            setShowFindCourse(false);
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: true,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              editCourse: false,
            });
          }}
        >
          Manage Users
        </button>
        <button
          onClick={() => {
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowFindCourse(false);
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
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              editCourse: false,
            });
          }}
        >
          Find a Course
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setShowModuleForm(false);
            setShowFindCourse(false);
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
              editCourse: false,
            });
          }}
        >
          Register New Course
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setShowCourseForm(false);
            setShowModuleForm(true);
            setShowFindCourse(false);
            setShowActivityForm(false);
            setshowUploadDocument(false);
            setOpenArchive(false);
            setAdminPanel({
              fetch: false,
              display: false,
              register: false,
              editMode: false,
              assign: false,
              editCourse: false,
            });
          }}
        >
          Manage Modules
        </button>

        <button
          onClick={() => {
            setUser(undefined);
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowFindCourse(false);
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
              editCourse: false,
            });
          }}
        >
          Manage Activities
        </button>

        <button
          onClick={() => {
            setUser(undefined);
            setShowCourseForm(false);
            setShowModuleForm(false);
            setShowFindCourse(false);
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
              editCourse: false,
            });
          }}
        >
          Upload Document
        </button>
        <button
          onClick={() => {
            setUser(undefined);
            setShowCourseForm(false);
            setShowFindCourse(false);
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
              editCourse: false,
            });
          }}
        >
          Open Archive
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
          {openArchive && <CourseArchive /> }


          {showFindCourse && (
            <CourseFetchForm
              onEdit={(course) => {
                setEditCourse(course);
                setAdminPanel({ ...adminPanel, editCourse: true });
              }}
            />
          )}
          {/* ModuleForm only, no course dropdown or module list here */}
          {showModuleForm && (
            <div style={{ marginTop: "1.5rem" }}>
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
          {showUploadDocument && <DocumentUploadForm legend={"Upload document"} token={token!} />}

          {adminPanel.editMode && !adminPanel.register && (
            <AdminForm legend="Edit User" onClose={() => setAdminPanel({ ...adminPanel, editMode: false })} />
          )}
          {adminPanel.register && (
            <AdminForm
              legend="Register User"
              onClose={() => setAdminPanel({ ...adminPanel, register: false, display: true })}
            />
          )}
          {/* Show course dropdown and module list only when creating a new module */}
          {showModuleForm && selectedCourse && (
            <ModuleList
              courseId={selectedCourse.id}
              token={token ?? ""}
              onEdit={(mod) => {
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
            <AssignCourse legend="Assign Course" onClose={() => setAdminPanel({ ...adminPanel, assign: false })} />
          )}
          {showCourseForm && <CourseCreate />}
          {adminPanel.editCourse && editCourse && <CourseEdit course={editCourse} />}
        </div>
      </div>
    </main>
  );
}
