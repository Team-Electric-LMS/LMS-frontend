import React from 'react';
import { TeacherDashboardSection } from './TeacherDashboardSection';
import { StudentDashboardSection } from './StudentDashboardSection';
import { useAuthContext } from '../auth/hooks/useAuthContext';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const role = user?.role?.toLowerCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="g-container">
      <button onClick={handleLogout}>Logout</button>
      <h2>Dashboard</h2>
      {role === 'teacher' && <TeacherDashboardSection />}
      {role === 'student' && <StudentDashboardSection />}
    </main>
  );
}
