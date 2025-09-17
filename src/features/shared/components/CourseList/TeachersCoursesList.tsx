import React, { useEffect } from 'react';
import { useFetchWithToken } from '../../../shared/hooks';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';

interface Course {
  id: string;
  name: string;
}

export function TeachersCoursesList() {
  const authContext = useAuthContext();
  // Fallback user object for development/testing
  const teacherId =
    authContext && authContext.user && typeof authContext.user.id === 'string'
      ? authContext.user.id
      : 'teacher@test.com';
  const userRole =
    authContext && authContext.user && typeof authContext.user.role === 'string'
      ? authContext.user.role
      : 'teacher';

  const endpoint = `/api/teachers/${teacherId}/courses`;
  const { data, error, isLoading, requestFunc } = useFetchWithToken<Course[]>(endpoint);

  useEffect(() => {
    if (teacherId && userRole === 'teacher') {
      requestFunc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId, userRole]);

  if (!teacherId) return <p>No teacher ID found.</p>;
  if (userRole !== 'teacher') return <p>You are not authorized to view teacher courses.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No courses found for this teacher.</p>;

  return (
    <ul>
      {data.map((course: Course) => (
        <li key={course.id}>{course.name}</li>
      ))}
    </ul>
  );
}