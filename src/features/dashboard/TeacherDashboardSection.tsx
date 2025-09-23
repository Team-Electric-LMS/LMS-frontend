import React from 'react';
import { TeachersCoursesList } from '../shared/components/CourseList/TeachersCoursesList';

export const TeacherDashboardSection: React.FC = () => (
  <>
    <p>Welcome, teacher! This is your dashboard.</p>
    <TeachersCoursesList />
  </>
);
