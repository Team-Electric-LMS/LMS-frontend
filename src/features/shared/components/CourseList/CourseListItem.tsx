import React from 'react';
import { Course } from '../../../auth/types';
import styles from './TeachersCoursesList.module.css';

interface CourseListItemProps {
  course: Course;
  onSelectCourse?: (course: { id: string; name: string }) => void;
}

export const CourseListItem: React.FC<CourseListItemProps> = ({ course, onSelectCourse  }) => (
  <li className={styles.courseItem}
  onClick={() => onSelectCourse?.({ id: course.id, name: course.name })}
    style={{ cursor: 'pointer' }}
    >
    <div><strong>{course.name}</strong></div>
    <div>{course.description}</div>
    <div>
      <span>Start: {course.startDate}</span> | <span>End: {course.endDate}</span>
    </div>
  </li>
);
