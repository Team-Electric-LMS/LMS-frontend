import { ReactElement, useState } from "react";
import { ModuleList } from "./ModuleList";
import { CourseDropdown } from "./CourseDropdown";
import { ICourse } from "../courses/types";
import { IModule } from '../types/modules';
import { useModuleForm } from '../hooks/useModuleForm';


interface ModuleFormProps {
  courseId?: string;
  module?: IModule;
  token: string;
  onClose: () => void;
  onSuccess?: (module: IModule, course?: ICourse) => void;
}

export function ModuleForm({ courseId, module, token, onClose, onSuccess }: ModuleFormProps): ReactElement {
  const [form, setForm] = useState<Partial<IModule>>(module || {});
  const [selectedCourse, setSelectedCourse] = useState<ICourse | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [createdModule, setCreatedModule] = useState<IModule | null>(null);
  const [editModule, setEditModule] = useState<IModule | undefined>(undefined);
  const [showEditForm, setShowEditForm] = useState(false);
  const isEdit = !!editModule;
  const effectiveCourseId = isEdit ? (courseId || selectedCourse?.id) : selectedCourse?.id;
  const { createModule, updateModule, loading, error } = useModuleForm(effectiveCourseId ?? "", token);

  const handleChange = (field: keyof IModule, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for editing an existing module (from the list)
  const handleEditModule = (mod: IModule) => {
    setEditModule(mod);
    setForm(mod);
    setShowEditForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result: IModule | null = null;
    if (isEdit && editModule?.id) {
      // Always include courseId in the update payload
      const updatePayload = {
        name: form.name,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        courseId: form.courseId || editModule.courseId,
      };
      console.log('editModule before update:', editModule);
      console.log('Update payload:', updatePayload, 'Types:', {
        name: typeof updatePayload.name,
        description: typeof updatePayload.description,
        startDate: typeof updatePayload.startDate,
        endDate: typeof updatePayload.endDate,
        courseId: typeof updatePayload.courseId,
      });
      result = await updateModule(editModule.id, updatePayload);
    } else {
      if (!selectedCourse) return;
      // Ensure courseId in body matches route
      const formWithCourseId = { ...form, courseId: selectedCourse.id };
      result = await createModule(formWithCourseId);
    }
    if (result) {
      setSuccess(true);
      setCreatedModule(result);
    }
    if (result && onSuccess) onSuccess(result, selectedCourse);
    // Do NOT close the form after creation
    if (isEdit) {
      setEditModule(undefined);
      setShowEditForm(false);
    }
  };

  // Render form for creating or editing a module
  return (
    <main className="form-page">
      {!module && (
        <>
          <CourseDropdown
            token={token}
            onSelect={setSelectedCourse}
          />
          {selectedCourse && !showEditForm && (
            <ModuleList
              courseId={selectedCourse.id}
              token={token}
              onEdit={handleEditModule}
            />
          )}
        </>
      )}
      {(!showEditForm) && (
        <form className="form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>{isEdit ? "Edit Module" : "Create Module"}</legend>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              style={{resize: "vertical", width: "100%", boxSizing: "border-box", padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px"}}
            />
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={form.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={loading}>
              {isEdit ? "Update Module" : "Create Module"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            {success && (
              <div className="success-message">Module created successfully!</div>
            )}
          </fieldset>
        </form>
      )}
      {showEditForm && editModule && (
        <form className="form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Edit Module</legend>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              style={{resize: "vertical", width: "100%", boxSizing: "border-box", padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px"}}
            />
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate || ""}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={form.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={loading}>
              Update Module
            </button>
            <button type="button" onClick={() => {
              setShowEditForm(false);
              setEditModule(undefined);
              setForm({});
            }}>
              Cancel
            </button>
            {success && (
              <div className="success-message">Module updated successfully!</div>
            )}
          </fieldset>
        </form>
      )}
    </main>
  )};
