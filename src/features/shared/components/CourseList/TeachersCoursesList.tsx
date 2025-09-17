import React, { useEffect } from 'react';
import { useFetchWithToken } from '../../../shared/hooks';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';

interface Course {
  id: string;
  name: string;
  // Add other course fields as needed
}

// TODO:
// this should later fetch the userID from the auth/context/authProvider.tsx
// Verify that the user is a teacher before fetching courses
// but since we dont have the endpoint or EF written for that yet, we will skip that for now.
// short story: this works when we have EF and the endpoint set up.

export function TeachersCoursesList() {
  const authContext = useAuthContext();
  const teacherId = authContext?.user?.id ?? '';
  const endpoint = `/api/teachers/${teacherId}/courses`;
  const { data, error, isLoading, requestFunc } = useFetchWithToken<Course[]>(endpoint);

  useEffect(() => {
    if (teacherId) {
      requestFunc();
    }
  }, [teacherId]);

  if (!teacherId) return <p>No teacher ID found.</p>;
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
