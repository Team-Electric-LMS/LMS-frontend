import React from 'react';
import { StudentModuleList } from '../shared/components/StudentModuleList/StudentModuleList';
import { StudentCourseCard } from '../shared/components/student-course-card/StudentCourseCard';

export const StudentDashboardSection: React.FC = () => (
  <div>
    <StudentCourseCard />
    <StudentModuleList />
  </div>
);
