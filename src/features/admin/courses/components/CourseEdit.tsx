import { ReactElement, Suspense, useState } from "react";
import { CourseForm } from "./CourseForm";
import { Await, useLoaderData } from "react-router";
import { ICourse, ICourseLoader } from "../../types";
import { useParams } from "react-router";
import { BASE_URL } from "../../../shared/constants";
import { Course } from "../../../auth/types";
import { fetchWithToken } from "../../../shared/utilities";

export const CourseEdit = (): ReactElement => {
  const { course } = useLoaderData<ICourseLoader>();
  const { id } = useParams();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOnSubmit = async (courseData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      await fetchWithToken<Course>(`${BASE_URL}/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...courseData,
          id: id,
        }),
      });

      setSuccessMessage(`Course updated`);
    } catch (error) {
      setErrorMessage("Failed to update course. Please try again.");
      console.error("Error updating course:", error);
    }
  };

  return (
    <>
      <main id="create-course">
        <Suspense>
          <h1>Edit course</h1>
          <div className="form-wrapper">
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}

            <Await resolve={course}>
              {(course: ICourse) => (
                <CourseForm course={course} onSubmit={handleOnSubmit} />
              )}
            </Await>
          </div>
        </Suspense>
      </main>
    </>
  );
};
