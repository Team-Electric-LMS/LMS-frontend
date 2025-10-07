import { FormEvent, useEffect, useState } from "react";
import { assignToCourse, fetchAllCourses, fetchUserExtended } from "../api";
import { SelectInput } from "./SelectInput";
import { FormProps, ICourse, IUser } from "../types";
import { useAdminContext } from "../context/adminProvider";
import "../css/styles.css";


export function AssignCourse({ legend, onClose }: FormProps) {
  const { user, setUser, token } = useAdminContext();
  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [unassign, setUnassign] = useState(false);

  useEffect(() => {
    if (!token || !user) return;

    const loadCourses = async () => {
      try {
        const data = await fetchAllCourses(token);
        setAllCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token, user]);

  if (!user) return;

  const availableCourses = unassign
    ? user.role === "Teacher"
      ? user.coursesTaught || []
      : user.course
      ? [user.course]
      : []
    : allCourses.filter((course) => {
        if (user.role === "Teacher") {
          const taughtIds = user.coursesTaught?.map((c) => c.id) || [];
          return !taughtIds.includes(course.id);
        } else if (user.role === "Student") {
          return user.course?.id !== course.id;
        }
        return true;
      });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !user) return;

    try {
      if (!selectedCourse && !unassign) return;
      const courseId = allCourses.find((c) => c.name === selectedCourse);
      await assignToCourse(user.id, courseId!.id, unassign, token);

      const updatedUser: IUser | null = await fetchUserExtended(
        user.email,
        token
      );
      if (updatedUser) setUser(updatedUser);

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
          <div className="checkbox">
            
            <input
              type="checkbox"
              checked={unassign}
              onChange={(e) => {
                setUnassign(e.target.checked);
                setSelectedCourse("");
              }}
            />
            <p>Unassign?</p>
          </div>
          <SelectInput
            label={
              user.role === "Teacher"
                ? unassign
                  ? "Select course to remove"
                  : "Select course to add"
                : "Choose Course"
            }
            name="course"
            value={selectedCourse}
            onChange={(val) => setSelectedCourse(val)}
            options={availableCourses.map((c) => c.name)}
            required={!unassign}
          />

          { selectedCourse && (
            <p style={{ color: "green" }}>
              {unassign
                ? `Remove ${selectedCourse ?? "course"} from ${
                    user.userName
                  }?`
                : `Assign ${selectedCourse} to ${user.userName}?`}
            </p>
          )}

          <button type="submit" disabled={!selectedCourse || loading}>
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
