import React, { useEffect } from 'react';
import { useFetchWithToken } from '../../../shared/hooks';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { Course, IUser } from '../../../auth/types';

// TODO:
// this should later fetch the userID from the auth/context/authProvider.tsx
// Verify that the user is a teacher before fetching courses
// but since we dont have the endpoint or EF written for that yet, we will skip that for now.
// short story: this works when we have EF and the endpoint set up.

export function TeachersCoursesList() {
  const authContext = useAuthContext();
  // TODO: remove fallback when we have API in place and use the user from context
  // const user = authContext?.user as IUser | undefined;
  const teacherId = authContext?.user?.id ?? 'teacher@test.com';
  const userRole = authContext?.user?.role ?? 'teacher';

  const endpoint = `/api/teachers/${teacherId}/courses`;
  const { data, error, isLoading, requestFunc } = useFetchWithToken<Course[]>(endpoint);

  useEffect(() => {
    if (teacherId && userRole === 'teacher') {
      requestFunc();
    }
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
