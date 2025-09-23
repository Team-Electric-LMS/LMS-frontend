import { useEffect, useState } from "react";
import { useFetchWithToken } from "../shared/hooks";
import { useAuthContext } from "../auth/hooks/useAuthContext";
import { IStudentCourseInfo } from "../auth/types";
import { BASE_URL } from "../shared/constants";
import "./StudentCourseCard.css";

export function StudentCourseCard() {
  const authContext = useAuthContext();
  const studentId = authContext.user?.id;
  const userRole = authContext.user?.role;
  const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course` : "";
  const { data, error, isLoading, requestFunc } =
    useFetchWithToken<any>(endpoint);

  const [hasFetched, setHasFetched] = useState(false);
  const [course, setCourse] = useState<IStudentCourseInfo | null>(null);

  // Helper function
  function mapCourseResponse(response: any): IStudentCourseInfo {
    return {
      id: response.course.id,
      name: response.course.name,
      description: response.course.description,
      startDate: response.course.startDate,
      endDate: response.course.endDate,
    };
  }

  useEffect(() => {
    if (
      authContext.isLoggedIn &&
      studentId &&
      userRole?.toLowerCase() === "student" &&
      !hasFetched
    ) {
      requestFunc();
      setHasFetched(true);
    }
  }, [authContext.isLoggedIn, studentId, userRole, requestFunc, hasFetched]);

  useEffect(() => {
    if (data) {
      setCourse(mapCourseResponse(data));
    }
  }, [data]);

  if (!authContext.isLoggedIn) return <p>Logga in för att se din kurs.</p>;
  if (!authContext.user) return <p>Laddar användarinformation...</p>;
  if (authContext.user.role.toLowerCase() !== "student")
    return <p>Du är inte behörig att se kursen.</p>;
  if (isLoading) return <p>Laddar kursinformation...</p>;
  if (error) return <p>Ett fel uppstod: {error.message}</p>;
  if (!course) return <p>Ingen kurs hittades.</p>;

  return (
    <div className="student-course-card">
      <div className="student-course-header">
        <div>
          <h2>{course.name}</h2>
          <p className="student-course-description">{course.description}</p>
          <p className="student-course-date">Start date: {course.startDate}</p>
          <p className="student-course-date">End date: {course.endDate}</p>
        </div>
        <button className="student-course-button">View course</button>
      </div>
    </div>
  );
}
