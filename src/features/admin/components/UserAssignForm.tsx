import { FormEvent, useEffect, useState } from "react";
import { assignToCourse, fetchAllCourses, fetchUserExtended } from "../api";
import { SelectInput } from "./SelectInput";
import { FormProps, ICourse, IUser } from "../types";
import { useAdminContext } from "../context/adminProvider";

export function AssignCourse({ legend, onClose }: FormProps) {
  const { user, setUser, token } = useAdminContext();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseName, setCourseName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [reassigned, setReassigned] = useState(false);

  if (!user) return;
  useEffect(() => {
    if (!token) {
      console.error("No token available");
      return;
    }

    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses(token);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token]);

  
  const selectedCourse = courses.find((c) => c.name === courseName);



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    if (!token) {
    console.error("No token found, cannot submit");
    return;
  }

    try {
      const unassignFlag = !courseName;
      await assignToCourse(user.id, selectedCourse.id, unassignFlag, token);

      const updatedUser: IUser | null = await fetchUserExtended(user.email, token);
      if (updatedUser) setUser(updatedUser);

      setReassigned(true);
      onClose();
    } catch (err) {
      console.error("Error assigning user to course:", err);
    }
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>{legend}</legend>

          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <SelectInput
              label="Choose course"
              name="course"
              value={courseName}
              onChange={(val) => setCourseName(val)}
              options={courses.map((c) => c.name)}
              required
            />
          )}

          <p style={{ color: "red" }}>
            Assigning a new course to user <strong>{user.userName}</strong>
          </p>

          {reassigned && selectedCourse && (
            <p style={{ color: "green" }}>
              {courseName
                ? `Assigned ${selectedCourse.name} to ${user.userName}`
                : `Unassigned course from ${user.userName}`}
            </p>
          )}

          <button type="submit" disabled={!courseName}>
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
