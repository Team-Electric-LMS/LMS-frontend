import styles from './StudentModuleActivities.module.css';
import { StudentActivityCard } from '../StudentActivityCard/StudentActivityCard';
import { useEffect, useState } from 'react';

interface Activity {
  id: number;
  title: string;
  description?: string;
}

interface StudentModuleActivitiesProps {
  moduleId: string;
}

export function StudentModuleActivities({ moduleId }: StudentModuleActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Här kan du göra fetch från backend med moduleId
    // Just nu använder vi dummy-data
    const dummyActivities: Activity[] = [
      { id: 1, title: `Activity 1 for module ${moduleId}` },
      { id: 2, title: `Activity 2 for module ${moduleId}` },
      { id: 3, title: `Activity 3 for module ${moduleId}` },
    ];
    setActivities(dummyActivities);
  }, [moduleId]);

  return (
    <div className={styles['student-module-activities-card']}>
      <h2 className={styles['student-module-activities-title']}>
        Activities for module {moduleId}
      </h2>

      {activities.map((activity) => (
        <StudentActivityCard key={activity.id} title={activity.title} />
      ))}
    </div>
  );
}