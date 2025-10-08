import { ReactElement, Suspense, useState } from "react";
import { CourseForm } from "./CourseForm";
import { Await, useLoaderData } from "react-router";
import { ICourse, ICourseLoader } from "../../types";
import { useParams } from "react-router";
import { fetchWithToken } from "../../../shared/utilities";
import { Course } from "../../../auth/types";
import { BASE_URL } from "../../../shared/constants";

interface CourseEditProps {
  course: ICourse;
}

export const CourseEdit = ({ course }: CourseEditProps): ReactElement => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOnSubmit = async (courseData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      await fetchWithToken<Course>(`${BASE_URL}/courses/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...courseData,
          id: course.id,
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
        <fieldset>
          <legend>Edit course</legend>
          <div className="form-wrapper">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

            <Await resolve={course}>
              {(course: ICourse) => <CourseForm course={course} onSubmit={handleOnSubmit} />}
            </Await>
          </div>
        </fieldset>
      </main>
    </>
  );
};
