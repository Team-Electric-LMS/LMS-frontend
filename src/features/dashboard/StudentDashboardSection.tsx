import React, { useState } from 'react';
import { StudentModuleList } from '../shared/components/StudentModuleList/StudentModuleList';
import { StudentCourseCard } from '../shared/components/student-course-card/StudentCourseCard';
import { StudentModuleActivities } from '../shared/components/StudentModuleActivities/StudentModuleActivities';
import { CourseStudents } from '../courses/components/CourseStudents';

export const StudentDashboardSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<{
    id: string;
    moduleTitle: string;
  } | null>(null);

  return (
    <div>
      <CourseStudents/>
      <StudentCourseCard />
      <StudentModuleList onSelectModule={setSelectedModule} />
      {selectedModule && (
        <StudentModuleActivities
          moduleId={selectedModule.id}
          moduleTitle={selectedModule.moduleTitle}
        />
      )}
    </div>
  );
};
