import { useFetchWithToken } from '../../hooks/useFetchWithToken';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { BASE_URL } from '../../../shared/constants';
import styles from './CourseStudentCard.module.css';
import { CourseStudentCard } from './CourseStudentCard.tsx';
import { useEffect } from 'react';

interface Student {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function CourseStudents() {
    const { user } = useAuthContext();
    const studentId = user?.id;
    const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course/students` : '';
    const { data, error, isLoading, requestFunc } =
    useFetchWithToken<Student[]>(endpoint);
    useEffect(() => {
    if (studentId) {
      requestFunc().then(() => {});
    }
  }, [studentId]);


  if (!studentId) return <p className={styles.message}>No student with this ID found. </p>;
  if (isLoading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>Error: {error.message}</p>;
  if (!data || data.length === 0)
    return <p className={styles.message}>No other students found for this course.</p>;

  // Sort courses alphabetically and render
  const sortedStudents = [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));
  return (
     <div>
        <h2>Other students in your course:</h2>
    <ul >
      {sortedStudents.map((student: Student) => (
        <div className={styles['course-student-card']}>
        <CourseStudentCard
            userName={student.userName}
            firstName={student.firstName}
            lastName={student.lastName}
            email={student.email}
        /></div>
      ))}
    </ul>
    </div>
  );
}
