import React from 'react';
import { TeacherDashboardSection } from './TeacherDashboardSection';
import { StudentDashboardSection } from './StudentDashboardSection';
import { useAuthContext } from '../auth/hooks/useAuthContext';

export function Dashboard() {
  const { user } = useAuthContext();
  const role = user?.role?.toLowerCase();

  return (
    <main className="g-container">
      <h2>Dashboard</h2>
      {role === 'teacher' && <TeacherDashboardSection />}
      {role === 'student' && <StudentDashboardSection />}
    </main>
  );
}
