import { useEffect, useState } from "react";
import { useFetchWithToken } from "../../hooks";
import { useAuthContext } from "../../../auth/hooks/useAuthContext";
import { Course } from "../../../auth/types";
import { BASE_URL } from "../../constants";
import styles from "./StudentCourseCard.module.css";
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { StudentModuleList } from "../StudentModuleList/StudentModuleList";
>>>>>>> 0bed203216345901d14f2b34898b2258ac5c7991

// Component to list a student course
interface StudentCourseCardProps {
  onSelectModule?: (module: { id: string; moduleTitle: string }) => void;
}

export function StudentCourseCard({ onSelectModule }: StudentCourseCardProps) {
  const [showModules, setShowModules] = useState(false);

  const handleToggleModules = () => {
    setShowModules((prev) => !prev);
  };
  const authContext = useAuthContext();
  const studentId = authContext.user?.id;
  const userRole = authContext.user?.role;
  const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course` : "";
  const { data, error, isLoading, requestFunc } =
    useFetchWithToken<any>(endpoint);

  const [hasFetched, setHasFetched] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const navigate = useNavigate();

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
    <div className={styles['landing-page-bg']}>"
    <div className={styles['student-course-card']}>
      <div className={styles['student-course-header']}>
        <div>
          <h2>{course.name}</h2>
          <p className={styles['student-course-description']}>{course.description}</p>
          <p className={styles['student-course-date']}>Start date: {course.startDate}</p>
          <p className={styles['student-course-date']}>End date: {course.endDate}</p>
        </div>
<<<<<<< HEAD
        <button className={styles['student-course-button'] } onClick={() => navigate("/course/students", { replace: true })}>View students</button>
=======
        <button className={styles['student-course-button']} onClick={handleToggleModules}>
          {showModules ? 'Hide Course Modules' : 'Show Course Modules'}
        </button>
>>>>>>> 0bed203216345901d14f2b34898b2258ac5c7991
      </div>
      {/* Only show modules when toggled */}
      {showModules ? (
        <div className={styles['student-course-modules']}>
          <StudentModuleList onSelectModule={onSelectModule} />
        </div>
      ) : null}
    </div>
    </div>
  );
}
