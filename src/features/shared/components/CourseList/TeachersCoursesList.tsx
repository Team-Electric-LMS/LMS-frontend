import React, { useEffect } from 'react';
import { useFetchWithToken } from '../../../shared/hooks';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { Course } from '../../../auth/types';
import { BASE_URL } from '../../../shared/constants';
import styles from './TeachersCoursesList.module.css';
import { CourseListItem } from './CourseListItem';

export function TeachersCoursesList() {
  const authContext = useAuthContext();
  const teacherId = authContext?.user?.id;
  const userRole = authContext?.user?.role;
  const endpoint = teacherId ? `${BASE_URL}/teachers/${teacherId}/courses` : '';
  const { data, error, isLoading, requestFunc } = useFetchWithToken<Course[]>(endpoint);

  useEffect(() => {
    if (teacherId && userRole?.toLowerCase() === 'teacher') {
      requestFunc();
    }
  }, [teacherId, userRole]);

  if (!teacherId) return <p className={styles.message}>No teacher ID found.</p>;
  if (userRole?.toLowerCase() !== 'teacher') return <p className={styles.message}>You are not authorized to view teacher courses.</p>;
  if (isLoading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p className={styles.message}>No courses found for this teacher.</p>;

  // Sort courses alphabetically and render
  const sortedCourses = [...data].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <ul className={styles.courseList}>
      {sortedCourses.map((course: Course) => (
        <CourseListItem key={course.id} course={course} />
      ))}
    </ul>
  );
}