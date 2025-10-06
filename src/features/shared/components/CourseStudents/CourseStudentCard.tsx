import styles from './CourseStudentCard.module.css';
//import {Student} from './CourseStudents.tsx';

interface CourseStudentCardProps {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function CourseStudentCard({
  //userName,
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
