import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { App } from '../features/app';
import { Login } from '../features/auth/components';
import { requireAuthLoader } from '../features/auth/loaders';
import { StudentDashboard, TeacherDashboard } from '../features/dashboards/components';
import { getUserClaimsLoader } from '../features/auth/loaders/getUserClaimsLoader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* requireAuthLoader is a route guard that protects the App and its child routes. */}
      <Route element={<App />} loader={requireAuthLoader} path="/">
        <Route path="teacher/dashboard" element={<TeacherDashboard />} loader={getUserClaimsLoader}/>
        <Route path="student/dashboard" element={<StudentDashboard />} loader={getUserClaimsLoader}/>
      </Route>
      <Route element={<Login />} path="/login" />
    </>
  )
);
