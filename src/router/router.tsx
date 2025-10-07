import { Dashboard } from "../features/dashboard/Dashboard";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router";
import { App } from "../features/app";
import { Login } from "../features/auth/components";
import { requireAuthLoader } from "../features/auth/loaders";
import { CourseEdit, CourseCreate } from "../features/admin/courses/components";
import { courseLoader } from "../features/admin/courses/loaders/courseLoader";
import { LandingPage } from "../features/LandingPage/LandingPage";
import { AdminProvider } from "../features/admin/context";
import { AdminPage } from "../features/admin/components";
import { RequireRole } from "../features/shared/requireRole";
import { CourseStudents } from "../features/shared/components/CourseStudents/CourseStudents";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />} loader={requireAuthLoader} path="/">
        <Route index element={<LandingPage />} />
        <Route element={<Dashboard />} path="dashboard" />
        <Route
          element={
            <RequireRole roles={["teacher"]}>
              <Outlet />
            </RequireRole>
          }
        >
          <Route path="courses/new" element={<CourseCreate />} />
          <Route path="courses/:id/edit" element={<CourseEdit />} loader={courseLoader} />
          <Route
            path="admin"
            element={
              <AdminProvider>
                <AdminPage />
              </AdminProvider>
            }
          />
        </Route>
        <Route element={<CourseStudents />} path="/course/students" />
      </Route>
      <Route element={<Login />} path="login" />
    </>
  )
);
