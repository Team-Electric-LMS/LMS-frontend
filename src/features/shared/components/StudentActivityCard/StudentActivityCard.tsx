import styles from './StudentActivityCard.module.css';

interface StudentActivityCardProps {
  title: string;
}

export function StudentActivityCard({ title }: StudentActivityCardProps) {
  return (
    <div className={styles['student-activity-card']}>
      <p className={styles['student-activity-card-title']}>{title}</p>
    </div>
  );
}
