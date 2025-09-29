import { Dashboard } from "../features/dashboard/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { App } from "../features/app";
import { Login } from "../features/auth/components";
import { requireAuthLoader } from "../features/auth/loaders";
import { LandingPage } from "../features/LandingPage/LandingPage";
import { CourseEdit, CouseCreate } from "../features/courses/components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<LandingPage />} />
      <Route
        element={<Dashboard />}
        loader={requireAuthLoader}
        path="dashboard"
      />
      <Route element={<CouseCreate />} path="courses/new"></Route>
      <Route element={<CourseEdit />} path="courses/:id/edit"></Route>
      <Route element={<Login />} path="login" />
    </Route>
  )
);
