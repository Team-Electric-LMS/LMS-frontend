import React from 'react';
import { StudentCourseCard } from '../StudentCourseCard/StudentCourseCard';

export const StudentDashboardSection: React.FC = () => (
  <div>
    {/* Student-specific content goes here */}
    <p>Welcome, student! This is your dashboard.</p>
    <StudentCourseCard />
  </div>
);
