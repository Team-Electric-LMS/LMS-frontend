import { ReactElement, useState } from "react";
import { CourseForm } from "./CourseForm";
import { Course } from "../../auth/types";
import { BASE_URL } from "../../shared/constants";
import { fetchWithToken } from "../../shared/utilities";

export const CourseCreate = (): ReactElement => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOnSubmit = async (courseData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      fetchWithToken<Course>(`${BASE_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      setSuccessMessage(`Course created`);
    } catch (error) {
      setErrorMessage("Failed to create course. Please try again.");
      console.error("Error creating course:", error);
    }
  };

  return (
    <>
      <main className="form-page" id="create-course">
        <fieldset>
          <legend>Create Course</legend>
          <div className="form-wrapper">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
            <CourseForm onSubmit={handleOnSubmit} />
          </div>
        </fieldset>
      </main>
    </>
  );
};
