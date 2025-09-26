import { Dashboard } from '../features/dashboard/Dashboard';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { App } from '../features/app';
import { Login } from '../features/auth/components';
import { requireAuthLoader } from '../features/auth/loaders';
import { AdminPage } from '../features/admin/components/AdminPage';
import { AdminProvider } from '../features/admin/context/adminProvider';
import { LandingPage } from '../features/LandingPage/LandingPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<LandingPage />} />
      <Route element={<Dashboard />} loader={requireAuthLoader} path="dashboard" />
      <Route element={<Login />} path="login" />
    </Route>
  )
);
