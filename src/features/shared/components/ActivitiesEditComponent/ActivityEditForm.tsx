import { ReactElement, useEffect, useState } from "react";
import { IEvent } from "./types/events";
import { Input } from "../Input";
import { CourseDropdown } from "../../../admin/components/CourseDropdown";
import { ModulesDropdown } from "./ModulesDropdown";
import { useEventForm } from "./hooks/useEventForm";
import { useAdminContext } from "../../../admin/context";
import "./css/styles.css";
import { ActivitiesDropdown } from "./ActivitiesDropdown";

interface UnitFormProps {
  legend: string;
  eventObj?: IEvent;
  onClose?: () => void;
  onSuccess?: (module: IEvent) => void;
}

export function ActivityEditForm({
  legend,
  eventObj,
  onClose,
  onSuccess,
}: UnitFormProps): ReactElement {
  const isEdit = !!eventObj;
  const [editSpecific, setEditSpecific] = useState<boolean>(
    false
  );
  const [selectedCourse, setSelectedCourse] = useState<IEvent | undefined>(
    undefined
  );
  const [selectedModule, setselectedModule] = useState<IEvent | undefined>(
    undefined
  );

  const [selectedActivity, setselectedActivity] = useState<IEvent | undefined>(
    undefined
  );

  const [form, setForm] = useState<Partial<IEvent>>(eventObj || {});
  const [success, setSuccess] = useState(false);

  const { token } = useAdminContext();
  const { createActivity, updateActivity, loading, error } = useEventForm(
    token!
  );

  useEffect(() => {
  if (editSpecific && selectedActivity) {
    setForm({
      name: selectedActivity.name,
      description: selectedActivity.description,
      startDate: selectedActivity.startDate,
      endDate: selectedActivity.endDate,
      activityTypeName: selectedActivity.activityTypeName,
      id: selectedActivity.id, 
    });
  }
}, [editSpecific, selectedActivity]);

useEffect(() => {
  if (selectedModule) {
    setselectedActivity(undefined);
    setForm((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      name: "",
      description: "",
      activityTypeName: "",
    }));
  }
}, [selectedModule]);

useEffect(() => {
  if (selectedCourse) {
    setselectedModule(undefined);
    setselectedActivity(undefined);
    setForm({});
  }
}, [selectedCourse]);

useEffect(() => {
  if (!editSpecific) {
    setselectedActivity(undefined);
    setForm({});
  }
}, [editSpecific]);


  const handleChange = (field: keyof IEvent, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let result: IEvent | null = null;
    if ((isEdit && eventObj?.id) || editSpecific) {
      result = await updateActivity(form);
    } else {
      if (!selectedModule) return;
      result = await createActivity(selectedModule.id, form);
    }
    if (result) {
      setSuccess(true);
    }
    if (result && onSuccess) onSuccess(result);
  };
  if (selectedModule) console.log(selectedModule!.id)

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>
          <div className="checkbox">
            <input
              type="checkbox"
              checked={editSpecific}
              onChange={(e) => {
                setEditSpecific(e.target.checked);
              }}
            />
            <p>Edit?</p>
          </div> 
          
          {!isEdit && (
            <CourseDropdown token={token!} onSelect={setSelectedCourse} />
          )}
          {!selectedCourse && (
            <select
              disabled={true}
            >
              <option value="">-- Choose a module --</option>
            </select>
          )}
          {!isEdit && selectedCourse && (
            <ModulesDropdown
              id={selectedCourse!.id}
              token={token!}
              onSelect={setselectedModule}
            />
          )}
          {!selectedModule && editSpecific && (
            <select
              disabled={true}
            >
              <option value=""></option>
            </select>
          )}

           {!isEdit && selectedModule && editSpecific && (
            <ActivitiesDropdown
              id={selectedModule!.id}
              token={token!}
              onSelect={setselectedActivity}
            />
          )}

          <label htmlFor="name">Title</label>
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
            rows={2}
            style={{
              resize: "vertical",
              width: "100%",
              boxSizing: "border-box",
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            min={selectedModule?.startDate}
            max={selectedModule?.endDate}
            disabled={!selectedModule}
            value={form.startDate || ""}
            required
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            min={selectedModule?.startDate}
            max={selectedModule?.endDate}
            value={form.endDate || ""}
            disabled={!selectedModule}
            required
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
          <div className="radio-type">
            <div className="radio-choice">
              {" "}
              <Input
                type="radio"
                name="course"
                label="Seminar"
                value="Seminar"
                autoFocus={false}
                disabled={false}
                checked={form.activityTypeName === "Seminar"}
                required={false}
                onChange={(e) =>
                  handleChange("activityTypeName", e.target.value)
                }
              />
            </div>
            <div className="radio-choice">
              {" "}
              <Input
                type="radio"
                name="module"
                label="Workshop"
                value="Workshop"
                autoFocus={false}
                disabled={false}
                checked={form.activityTypeName === "Workshop"}
                required={false}
                onChange={(e) =>
                  handleChange("activityTypeName", e.target.value)
                }
              />
            </div>
            <div className="radio-choice">
              {" "}
              <Input
                type="radio"
                name="activity"
                label="Assignment"
                value="Assignment"
                autoFocus={false}
                disabled={false}
                checked={form.activityTypeName === "Assignment"}
                onChange={(e) =>
                  handleChange("activityTypeName", e.target.value)
                }
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={!selectedModule || !form.activityTypeName}>
            {(isEdit || editSpecific) ? "Update Activity" : "Create Activity"}
          </button>
          <button type="button" onClick={() => onClose?.()}>
            Cancel
          </button>
          {loading && <div>Updating ....</div>}
          {success && (
            <div className="success-message">
              {form.name} changed successfully!
            </div>
          )}
        </fieldset>
      </form>
    </main>
  );
}
