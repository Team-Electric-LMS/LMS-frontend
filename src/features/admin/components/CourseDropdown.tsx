import React, { useEffect, useState } from "react";
import { ICourse } from "../courses/types";
import { getCourses } from "../courses/api";

interface CourseDropdownProps {
  token: string;
  onSelect: (course: ICourse) => void;
}

export const CourseDropdown: React.FC<CourseDropdownProps> = ({ token, onSelect }) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getCourses(token)
      .then(setCourses)
      .catch(() => setError("Failed to fetch courses."))
      .finally(() => setLoading(false));
  }, [token]);

  // Handle course selection
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    const course = courses.find((c) => c.id === id);
    if (course) onSelect(course);
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  // Render course selection dropdown
  return (
    <div>
      <label htmlFor="course-select">Select Course:</label>
      <select id="course-select" value={selectedId} onChange={handleChange}>
        <option value="">-- Choose a course --</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  );
};
