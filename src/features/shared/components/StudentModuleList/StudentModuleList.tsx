import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { useFetchWithToken } from '../../hooks/useFetchWithToken';
import styles from './StudentModuleList.module.css';
import { Module, CourseWithModules } from '../../../auth/types';
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

  return (
    <div>
      <div className={styles.courseCard}>
        <div className={styles.courseTitle}>{data.name}</div>
        <div className={styles.courseDescription}>{data.description}</div>
        <div className={styles.courseDates}>
          <span>Start: {data.startDate}</span> | <span>End: {data.endDate}</span>
        </div>
      </div>
      {data.modules && data.modules.length > 0 ? (
        <ul className={styles.moduleList}>
          {[...data.modules]
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .map((module) => (
              <li key={module.id} className={styles.moduleItem}>
                <div><strong>{module.name}</strong></div>
                <div>{module.description}</div>
                <div>
                  <span>Start: {module.startDate}</span> | <span>End: {module.endDate}</span>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <p className={styles.message}>No modules found for this course.</p>
      )}
    </div>
  );
};
