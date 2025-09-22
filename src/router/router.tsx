import { Dashboard } from '../features/dashboard/Dashboard';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { App } from '../features/app';
import { Login } from '../features/auth/components';
import { requireAuthLoader } from '../features/auth/loaders';

// TODO: REMOVE THE COMPANIES ROUTES AND REPLACE WITH TEACHER COURSES ROUTE
// ADD ADDITIONAL ROUTES FOR LMS
// AND JUST REMOVE ALL THE COMPANIES STUFF WHEREVER IT IS
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* requireAuthLoader is a route guard that protects the App and its child routes. */}
      <Route element={<App />} loader={requireAuthLoader} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Login />} path="/login" />
    </>
  )
);
