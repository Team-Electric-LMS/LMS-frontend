import styles from './StudentModuleActivities.module.css';
import { StudentActivityCard } from '../StudentActivityCard/StudentActivityCard';

export function StudentModuleActivities() {
  const activities = [
    { id: 1, title: 'Activity number 1' },
    { id: 2, title: 'Activity number 2' },
    { id: 3, title: 'Activity number 3' },
  ];

  return (
    <div className={styles['student-module-activities-card']}>
      <h2 className={styles['student-module-activities-title']}>Activities</h2>

      {activities.map((activity) => (
        <StudentActivityCard key={activity.id} title={activity.title} />
      ))}
    </div>
  );
}
