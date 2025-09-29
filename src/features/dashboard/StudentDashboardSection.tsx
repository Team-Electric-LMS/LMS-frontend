import React, { useState } from 'react';
import { StudentModuleList } from '../shared/components/StudentModuleList/StudentModuleList';
import { StudentCourseCard } from '../shared/components/student-course-card/StudentCourseCard';
import { StudentModuleActivities } from '../shared/components/StudentModuleActivities/StudentModuleActivities';

export const StudentDashboardSection: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  return (
    <div>
      <StudentCourseCard />
      <StudentModuleList onSelectModule={setSelectedModuleId} />
      {selectedModuleId && (
        <StudentModuleActivities moduleId={selectedModuleId} />
      )}
    </div>
  );
};
