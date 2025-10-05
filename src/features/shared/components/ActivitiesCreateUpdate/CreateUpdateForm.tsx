import { ReactElement, useState } from "react";
import { IEvent } from "./types/events";
import { Input } from "../Input";
import { CourseDropdown } from "../../../admin/components/CourseDropdown";
import { ModulesDropdown } from "./ModulesDropdown";
import { useEventForm } from "./hooks/useEventForm";

interface UnitFormProps {
  eventCat?: string;
  eventId?: string;
  eventObj?: IEvent;
  token: string;
  onClose?: () => void;
  onSuccess?: (module: IEvent) => void;
}

export function EventForm({
  eventCat,
  eventId,
  eventObj,
  token,
  onClose,
  onSuccess,
}: UnitFormProps): ReactElement {
  const isEdit = !!eventObj;
  const [level, setLevel] = useState<string>(eventCat || "");
  const [selectedCourse, setSelectedCourse] = useState<IEvent | undefined>(undefined);
  const [selectedModule, setselectedModule] = useState<IEvent | undefined>(undefined);
  const [selectedActivity, setselectedActivity] = useState<IEvent | undefined>(undefined);


  const [form, setForm] = useState<Partial<IEvent>>(eventObj || {});

  const [success, setSuccess] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<IEvent | null>(null);
  
  const effectiveEventId = isEdit ? eventId : eventObj!.id;
  const { createActivity, updateActivity, loading, error } = useEventForm(selectedActivity!.id ?? token); 

  const handleChange = (field: keyof IEvent, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission for creating or updating a module
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result: IEvent | null = null;
    if (isEdit && eventObj?.id) {
      result = await updateActivity(eventObj.id, form);
    } else {
      if (!selectedModule) return;
      // Ensure courseId in body matches route
      //const formWithCourseId = { ...form, courseId: selectedCourse.id };
      //console.log("Creating module with payload:", formWithCourseId);
      result = await createActivity(selectedModule!.id, form);
    }
    if (result) {
      setSuccess(true);
      setCreatedEvent(result);
    }
    if (result && onSuccess) onSuccess(result);
    // Do NOT close the form after creation
  };


console.log("myform", form)

  // Render form for creating or editing a module
  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{isEdit ? "Edit Module" : "Create Module"}</legend>
          <div>
            <Input type="radio" name="course" label = "course" value= "course" autoFocus={false} disabled={false} checked={level === 'course'}  onChange={(e) =>  setLevel(e.target.value) }/>
            <Input type="radio" name="module" label = "module" value= "module" autoFocus={false} disabled={false} checked={level === 'module'} onChange={(e) =>  setLevel(e.target.value) }/>
            <Input type="radio" name="activity" label = "activity" value= "activity" autoFocus={false} disabled={false} checked={level === 'activity'} onChange={(e) =>  setLevel(e.target.value) }/>
          </div>

          {!isEdit && (
            <CourseDropdown token={token} onSelect={setSelectedCourse} />
          )}
           {!isEdit && selectedCourse && (<ModulesDropdown id = {selectedCourse!.id} token={token} onSelect={setselectedModule} />)}

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
          <button type="submit" disabled={false}>
            {isEdit ? "Update Event" : "Create Event"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          {success && (
            <div className="success-message">
              {eventCat} created successfully!
            </div>
          )}
        </fieldset>
      </form>
    </main>
  );
}
