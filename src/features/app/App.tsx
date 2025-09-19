import { Outlet } from 'react-router';
import { Header } from '../shared/components';
import { TeachersCoursesList } from '../shared/components/CourseList/TeachersCoursesList';

export function App() {
  return (
    <>
      <Header />
      <TeachersCoursesList />
      <Outlet />
    </>
  );
}
