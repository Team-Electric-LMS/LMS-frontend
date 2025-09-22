import React from 'react';
import { Course } from '../../../auth/types';
import styles from './TeachersCoursesList.module.css';

interface CourseListItemProps {
  course: Course;
}

export const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => (
  <li className={styles.courseItem}>{course.name}</li>
);
