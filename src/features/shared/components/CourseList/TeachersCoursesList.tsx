import React, { useEffect } from 'react';
import { useFetchWithToken } from '../../../shared/hooks';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { Course, IUser } from '../../../auth/types';
import { BASE_URL } from '../../../shared/constants';

export function TeachersCoursesList() {
  const authContext = useAuthContext();
  const teacherId = authContext?.user?.id;
  const userRole = authContext?.user?.role;
  // {BASE_URL}/teachers/{teacherId}/courses translates to /api/teachers/{teacherId}/courses
  // I am not sure if this should be in production code or in the hook, but for now, it is here.
  const endpoint = teacherId ? `${BASE_URL}/teachers/${teacherId}/courses` : '';
  const { data, error, isLoading, requestFunc } = useFetchWithToken<Course[]>(endpoint);

  useEffect(() => {
    // TODO: Remove console logs after debugging
    console.log('TeachersCoursesList mounted');
    console.log('teacherId:', teacherId);
    console.log('userRole:', userRole);
    if (teacherId && userRole?.toLowerCase() === 'teacher') {
      console.log('Calling requestFunc for endpoint:', endpoint);
      requestFunc();
    } else {
      console.log('Not calling requestFunc: missing teacherId or userRole not teacher');
    }
  }, [teacherId, userRole]);
  // TODO: add errorboundary messages, loading spinners and nicer UI
  if (!teacherId) return <p>No teacher ID found.</p>;
  if (userRole?.toLowerCase() !== 'teacher') return <p>You are not authorized to view teacher courses.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No courses found for this teacher.</p>;
  // TODO: improve UI, move into separate JSX component and add styling
  return (
    <ul>
      {data.map((course: Course) => (
        <li key={course.id}>{course.name}</li>
      ))}
    </ul>
  );
}
