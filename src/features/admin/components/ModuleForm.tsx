import { ReactElement, useState } from "react";
import { CourseDropdown } from "./CourseDropdown";
import { ICourse } from "../../courses/types";
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
  const isEdit = !!module;
  const effectiveCourseId = isEdit ? courseId : selectedCourse?.id;
  const { createModule, updateModule, loading, error } = useModuleForm(effectiveCourseId ?? "", token);

  const handleChange = (field: keyof IModule, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission for creating or updating a module
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result: IModule | null = null;
    if (isEdit && module?.id) {
      result = await updateModule(module.id, form);
    } else {
      if (!selectedCourse) return;
      // Ensure courseId in body matches route
      const formWithCourseId = { ...form, courseId: selectedCourse.id };
      console.log("Creating module with payload:", formWithCourseId);
      result = await createModule(formWithCourseId);
    }
    if (result) {
      setSuccess(true);
      setCreatedModule(result);
    }
    if (result && onSuccess) onSuccess(result, selectedCourse);
    // Do NOT close the form after creation
  };

  // Render form for creating or editing a module
  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{isEdit ? "Edit Module" : "Create Module"}</legend>
          {!isEdit && (
            <CourseDropdown
              token={token}
              onSelect={setSelectedCourse}
            />
          )}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
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
      </main>
    );
}
