import { useEffect, useState } from "react";
import { useFetchWithToken } from "../hooks";
import { useAuthContext } from "../../auth/hooks/useAuthContext";
import { IStudentCourseInfo } from "../../auth/types";
import { BASE_URL } from "../constants";
import "./CourseCard.css";

export function CourseCard() {
  const authContext = useAuthContext();
  const studentId = authContext.user?.id;
  const userRole = authContext.user?.role;
  const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course` : "";
  const { data, error, isLoading, requestFunc } =
    useFetchWithToken<IStudentCourseInfo>(endpoint);

  const [hasFetched, setHasFetched] = useState(false);

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

  if (!authContext.isLoggedIn) return <p>Logga in för att se din kurs.</p>;
  if (!authContext.user) return <p>Laddar användarinformation...</p>;
  if (authContext.user.role.toLowerCase() !== "student")
    return <p>Du är inte behörig att se kursen.</p>;
  if (isLoading) return <p>Laddar kursinformation...</p>;
  if (error) return <p>Ett fel uppstod: {error.message}</p>;
  if (!data) return <p>Ingen kurs hittades.</p>;

  return (
    <div className="course-card">
      <div className="course-header">
        <div>
          <h2>{data.name}</h2>
          <p className="course-description">{data.description}</p>
          <p className="course-date">Startdatum: {data.startDate}</p>
          <p className="course-date">Slutdatum: {data.endDate}</p>
        </div>
        <button className="course-button">Visa kurs</button>
      </div>
    </div>
  );
}
