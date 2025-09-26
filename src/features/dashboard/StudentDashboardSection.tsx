import React from 'react';
import { StudentModuleList } from '../shared/components/StudentModuleList/StudentModuleList';
import { StudentCourseCard } from '../shared/components/student-course-card/StudentCourseCard';
import { StudentModuleActivities } from '../shared/components/StudentModuleActivities/StudentModuleActivities';

export const StudentDashboardSection: React.FC = () => (
  <div>
    <StudentCourseCard />
    <StudentModuleActivities />
    <StudentModuleList />
  </div>
);
