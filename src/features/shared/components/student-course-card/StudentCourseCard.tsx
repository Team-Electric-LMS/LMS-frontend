import { useEffect, useState } from "react";
import { useFetchWithToken } from "../../hooks";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { Course } from "../../../auth/types";
import { BASE_URL } from "../../constants";
import styles from "./StudentCourseCard.module.css";
import { DocumentList } from "../Documents/DocumentList";

// Component to list a student course
export function StudentCourseCard() {
  const authContext = useAuthContext();
  const studentId = authContext.user?.id;
  const userRole = authContext.user?.role;
  const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course` : "";
  const { data, error, isLoading, requestFunc } =
    useFetchWithToken<any>(endpoint);

  const [hasFetched, setHasFetched] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);

  // Helper function
  function mapCourseResponse(response: any): Course {
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

  if (!authContext.isLoggedIn) return <p>Log in to see your course</p>;
  if (!authContext.user) return <p>Loading...</p>;
  if (authContext.user.role.toLowerCase() !== "student")
    return <p>You dont't have access to course.</p>;
  if (isLoading) return <p>Loading course information...</p>;
  if (error) return <p>Error occured: {error.message}</p>;
  if (!course) return <p>No course found.</p>;

  // Render out student course card
  return (
    <div className={styles['student-course-card']}>
      <div className={styles['student-course-header']}>
        <div>
          <h2>{course.name}</h2>
          <p className={styles['student-course-description']}>{course.description}</p>
          <p className={styles['student-course-date']}>Start date: {course.startDate}</p>
          <p className={styles['student-course-date']}>End date: {course.endDate}</p>
          <DocumentList level='course' id={course.id}/>
        </div>
        <button className={styles['student-course-button']}>View course</button>
      </div>
    </div>
  );
}
