import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { useFetchWithToken } from '../../hooks/useFetchWithToken';
import styles from './StudentModuleList.module.css';
import { CourseWithModules } from '../../../auth/types';
import { ModuleList } from './ModuleList';
import { BASE_URL } from '../../constants';

export const StudentModuleList: React.FC = () => {
  const { user } = useAuthContext();
  const studentId = user?.id;
  const endpoint = studentId ? `${BASE_URL}/student/${studentId}/course-with-modules` : '';
  const { data, error, isLoading, requestFunc } = useFetchWithToken<CourseWithModules>(endpoint);

  useEffect(() => {
    if (studentId) {
      requestFunc();
    }
  }, [studentId]);

  if (!studentId) return <p className={styles.message}>No student ID found.</p>;
  if (isLoading) return <p className={styles.message}>Loading course and modules...</p>;
  if (error) return <p className={styles.message}>Error: {error.message}</p>;
  if (!data) return <p className={styles.message}>No course found for this student.</p>;

  // Render the list of modules that belong to the student's course
  return (
    <div>
      {data.modules && data.modules.length > 0 ? (
        <ModuleList modules={data.modules} />
      ) : (
        <p className={styles.message}>No modules found for this course.</p>
      )}
    </div>
  );
};

