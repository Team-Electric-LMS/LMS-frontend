import { Dashboard } from "../features/dashboard/Dashboard";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { App } from "../features/app";
import { Login } from "../features/auth/components";
import { requireAuthLoader } from "../features/auth/loaders";
import { CourseEdit, CourseCreate } from "../features/admin/courses/components";
import { courseLoader } from "../features/admin/courses/loaders/courseLoader";
import { LandingPage } from "../features/LandingPage/LandingPage";
import { AdminProvider } from "../features/admin/context";
import { AdminPage } from "../features/admin/components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<LandingPage />} />
      <Route element={<Dashboard />} loader={requireAuthLoader} path="dashboard" />
      <Route element={<AdminProvider><AdminPage /></AdminProvider>} loader={requireAuthLoader} path="admin" />
      <Route element={<CourseCreate />} path="courses/new" />
      <Route element={<CourseEdit />} path="courses/:id/edit" loader={courseLoader} />
      <Route element={<Login />} path="login" />
    </Route>
  )
);
