import React, { useState } from 'react';
import { TeachersCoursesList } from '../shared/components/CourseList/TeachersCoursesList';
import { TeacherModuleList } from '../shared/components/TeacherModuleList/TeacherModuleList';

export const TeacherDashboardSection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    name: string;
  } | null>(null);

  return (
    <div>
      <TeachersCoursesList onSelectCourse={setSelectedCourse} />
      {selectedCourse && (
        <TeacherModuleList
          courseId={selectedCourse.id}
          courseName={selectedCourse.name}
        />
      )}
    </div>
  );
};
