import React, { useState } from 'react';
import { StudentModuleList } from '../shared/components/StudentModuleList/StudentModuleList';
import { StudentCourseCard } from '../shared/components/student-course-card/StudentCourseCard';
import { StudentModuleActivities } from '../shared/components/StudentModuleActivities/StudentModuleActivities';

export const StudentDashboardSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<{
    id: string;
    moduleTitle: string;
  } | null>(null);

  const handleSelectModule = (module: { id: string; moduleTitle: string }) => {
    if (selectedModule?.id === module.id) {
      setSelectedModule(null);
    } else {
      setSelectedModule(module);
    }
  };

  return (
    <div>
      <StudentCourseCard />
      <StudentModuleList onSelectModule={handleSelectModule} />
      {selectedModule && (
        <StudentModuleActivities
          moduleId={selectedModule.id}
          moduleTitle={selectedModule.moduleTitle}
        />
      )}
    </div>
  );
};
