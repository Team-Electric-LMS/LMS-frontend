import React from 'react';
import { Course } from '../../../auth/types';
import styles from './TeachersCoursesList.module.css';

interface CourseListItemProps {
  course: Course;
}

export const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => (
  <li className={styles.courseItem}>
    <div><strong>{course.name}</strong></div>
    <div>{course.description}</div>
    <div>
      <span>Start: {course.startDate}</span> | <span>End: {course.endDate}</span>
    </div>
  </li>
);
