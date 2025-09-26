import { FormEvent, useState } from "react";
import { assignToCourse, fetchUserExtended } from "../api";
import { SelectInput } from "./SelectInput";
import { FormProps } from "../types";
import { useAdmin } from "../context/adminProvider";

const dummyCourses = [
  { id: "b2be605c-d851-4c2e-b89f-6485e59ad9be", name: "Demo Course 1" },
  { id: "813ea1b7-c693-4b20-aae9-aa7bce19bf7e", name: "Demo Course 2" },
  { id: "1a1c2212-2035-4a49-93ac-2b6c2b5af260", name: "Demo Course 3" },
  { id: "bcc7009f-93c6-429c-b5a8-330fdb6a8c07", name: "Demo Course 4" },
  { id: "unassign", name: "Unassign from a course" },
];

export function AssignCourse({ legend, onClose }: FormProps) {
  const { user, setUser, token } = useAdmin();
  const [courseId, setCourseId] = useState<string>("");
  const [reassigned, setReAssigned] = useState<boolean>(false);

  if (!user) return;
  if (!token) {
    console.error("No token available");
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    const unassignFlag = courseId === null;

    try {
      await assignToCourse(user.id, courseId, unassignFlag, token);
      console.log("Assigned, now fetching user with", user.email, token);

      const updatedUser = await fetchUserExtended(user.email, token);
      console.log("Fetch result:", updatedUser);
      if (updatedUser) setUser(updatedUser);
      setReAssigned(true);

      onClose();
    } catch (err) {
      console.error("Error assigning user to course:", err);
    }
  };

  const selectedCourse = dummyCourses.find((c) => c.id === courseId);

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>

          <SelectInput
            label="Choose course"
            name="course"
            value={courseId}
            onChange={setCourseId}
            options={dummyCourses.map((c) => c.id)}
            required
          />

          <p style={{ color: "red" }}>
            Assigning a new course to user {user.userName}
          </p>
          {reassigned && selectedCourse && (
            <p style={{ color: "green" }}>
              {courseId == null
                ? `Unassigned course from ${user.userName}`
                : `Assigned ${selectedCourse.name} to ${user.userName}`}
            </p>
          )}

          <button type="submit" disabled={!courseId}>
            Submit
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </fieldset>
      </form>
    </main>
  );
}
