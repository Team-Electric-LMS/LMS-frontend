import { FormEventHandler, ReactElement, useState } from "react";
import "../css/styles.css";
import { useAdminContext } from "../context/adminProvider";
import { ICourse } from "../types";
import { searchCourses } from "../courses/api";

interface CourseFetchFormProps {
  onEdit: (course: ICourse) => void;
}

export function CourseFetchForm({ onEdit }: CourseFetchFormProps): ReactElement {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [name, setName] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const { token } = useAdminContext();

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No token available");
      return;
    }

    const results = await searchCourses(name, token);
    if (results && results.length > 0) {
      setCourses(results);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const handleEdit = (course: ICourse) => {
    onEdit(course);
  };

  return (
    <main className="form-page">
      <form className="form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Find a course</legend>
          <label htmlFor="name">Course name</label>
          <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" required />
          <button type="submit">Find Course</button>
          {notFound && <p style={{ color: "red" }}> Course not found</p>}
        </fieldset>
      </form>

      {courses.length > 0 && (
        <div className="courses-list">
          <h2>Found Courses ({courses.length})</h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <div className="course-item">
                  <h3>{course.name}</h3>
                  {course.description && <p>{course.description}</p>}
                  <p>Start date: {course.startDate}</p>
                  <p>End date: {course.endDate}</p>
                  <button className="edit-button" onClick={() => handleEdit(course)}>
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
