import React, { useState } from 'react';
import { TeachersCoursesList } from '../shared/components/CourseList/TeachersCoursesList';
import { TeacherModuleList } from '../shared/components/TeacherModuleList/TeacherModuleList';
import TeacherModuleActivities from '../shared/components/TeacherModuleActivities/TeacherModuleActivities';

export const TeacherDashboardSection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] =
    useState<{ id: string; name: string } | null>(null);
  const [selectedModule, setSelectedModule] =
    useState<{ id: string; moduleTitle: string } | null>(null);

  const handleSelectCourse = (course: { id: string; name: string }) => {
    setSelectedCourse(course);
    setSelectedModule(null); // reset when course changes
  };

  const handleCloseModules = () => {
    setSelectedCourse(null);
    setSelectedModule(null);
  };

  return (
    <div>
      <TeachersCoursesList onSelectCourse={handleSelectCourse} />

      {selectedCourse && (
        <>
          <TeacherModuleList
            courseId={selectedCourse.id}
            courseName={selectedCourse.name}
            onClose={handleCloseModules}
            onSelectModule={setSelectedModule}
          />

          {selectedModule && (
            <TeacherModuleActivities
              moduleId={selectedModule.id}
              moduleTitle={selectedModule.moduleTitle}
            />
          )}
        </>
      )}
    </div>
  );
};
