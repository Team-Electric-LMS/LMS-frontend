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
      <p className={styles['student-activity-card-title']}>{activityTitle}</p>
      <p>{description}</p>
      <p>Type: {activityTypeName}</p>
      <p>
        {startDate}   {endDate}
      </p>
    </div>
  );
}
