import styles from './CourseStudentCard.module.css';

interface CourseStudentCardProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function CourseStudentCard({
  firstName,
  lastName,
  email
}: CourseStudentCardProps) {
  return (
    <div className={styles['student-activity-card']}>
      <div>
        <span className={styles['prefix']}> Name: </span> 
        <span>{firstName} {lastName}</span>
      </div>
      <div>
        <span className={styles['prefix']}> Email: </span> 
        <span>{email}</span>
      </div>
    </div>
  );
}
