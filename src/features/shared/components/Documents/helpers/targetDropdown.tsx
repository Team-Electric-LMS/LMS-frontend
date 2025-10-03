import React, { useEffect, useState } from "react";
import { IActivity, ICourse, IModule, SelectionType } from "../types";
import { getCoursesExtended } from "../api";


interface TargetDropdownProps {
  token: string;
  onSelect: (node: { id: string; type: SelectionType }) => void;
}


export function TargetDropdown({ token, onSelect }: TargetDropdownProps) {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          setLoading(true)
          const data = await getCoursesExtended(token);
          setCourses(data);
          setLoading(false)
        } catch (err) {
          setError("Failed to fetch courses");
        }
      };
  
      fetchCourses();
    }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const type = e.target.selectedOptions[0].dataset.type as SelectionType;
    setSelectedId(id);
    (type);
    if (id && type) onSelect({ id, type });
  };

  if (loading) return <div>Loading options...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="form-control">
      <label htmlFor="target">Target</label>
      <select
        id="target"
        value={selectedId}
        onChange={handleChange}
        required
        className="select-input"
      >
        <option value="">- Select Course / Module / Activity -</option>
        {renderOptions(courses)}
      </select>
    </div>
  );
};

const renderOptions = (courses: ICourse[], depth = 1): React.ReactElement[] => {
  return courses.flatMap((course) => {
    const courseOption: React.ReactElement = (
      <option key={`course-${course.id}`} value={course.id} data-type="course">
        {`${"-".repeat(depth)} ${course.name}`}
      </option>
    );

    const moduleOptions: React.ReactElement[] = course.modules.flatMap((m: IModule) => {
      const modOption: React.ReactElement = (
        <option key={`module-${m.id}`} value={m.id} data-type="module">
          {`${"-".repeat(depth + 1)} ${m.name}`}
        </option>
      );

      const activityOptions: React.ReactElement[] = m.activities.map((a: IActivity) => (
        <option key={`activity-${a.id}`} value={a.id} data-type="activity">
          {`${"-".repeat(depth + 2)} ${a.name}`}
        </option>
      ));

      return [modOption, ...activityOptions];
    });

    return [courseOption, ...moduleOptions];
  });
};