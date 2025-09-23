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
    <Route element={<App />} path="/">
      <Route element={<Dashboard />} loader={requireAuthLoader} path="dashboard" />
      <Route element={<Login />} path="login" />
    </Route>
  )
);
