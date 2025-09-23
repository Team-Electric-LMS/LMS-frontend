import React from 'react';
import { TeacherDashboardSection } from './TeacherDashboardSection';
import { StudentDashboardSection } from './StudentDashboardSection';
import { useAuthContext } from '../auth/hooks/useAuthContext';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { user } = useAuthContext();
  const role = user?.role?.toLowerCase();

  return (
    <main className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Dashboard</h2>
      {role === 'teacher' && <TeacherDashboardSection />}
      {role === 'student' && <StudentDashboardSection />}
    </main>
  );
}
