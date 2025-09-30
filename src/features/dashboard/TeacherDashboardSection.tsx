import React from 'react';
import { TeachersCoursesList } from '../shared/components/CourseList/TeachersCoursesList';
import { TeacherModuleList } from '../shared/components/TeacherModuleList/TeacherModuleList';

export const TeacherDashboardSection: React.FC = () => (
  <>
    <TeachersCoursesList />
    {/* <TeacherModuleList courseId={''} /> */}
    <TeacherModuleList courseId='bed88584-2f62-4593-ab4f-13c9e62b931a' />
  </>
);
