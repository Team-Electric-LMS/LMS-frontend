import styles from './StudentActivityCard.module.css';

interface StudentActivityCardProps {
  activityTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  activityTypeName: string;
}

export function StudentActivityCard({
  activityTitle,
  description,
  startDate,
  endDate,
  activityTypeName,
}: StudentActivityCardProps) {
  return (
    <div className={styles['student-activity-card']}>
      <div className={styles['student-activity-card-title']}>
        {activityTitle}
      </div>
      <div className={styles['activity-info-block']}>{description}</div>
      <div className={styles['activity-info-block']}>Type: {activityTypeName}</div>
      <div className={styles['activity-info-block']}>
        <span>Start: {startDate}</span> | <span>End: {endDate}</span>
      </div>
    </div>
  );
}
