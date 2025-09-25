import React from 'react';
import styles from './StudentModuleActivities.module.css';

const StudentModuleActivities: React.FC = () => {

    const activities = [
    { id: 1, title: "Activity number 1" },
    { id: 2, title: "Activity number 2" },
    { id: 3, title: "Activity number 3" }
  ];


  return (
    <div className={styles['student-module-activities-card']}>
        <h2 className={styles['student-module-activities-title']}>Activities</h2>

      {activities.map(activity => (
        <p key={activity.id}>{activity.title}</p>
      ))}

    </div>
  );
};

export default StudentModuleActivities;
