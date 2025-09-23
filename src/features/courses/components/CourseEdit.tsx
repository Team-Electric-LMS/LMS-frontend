import { ReactElement } from "react";
import { CourseForm } from "./CourseForm";

export const CourseEdit = (): ReactElement => {
  const handleOnSubmit = async (courseData: { name: string; description: string; startDate: string }) => {
    console.log(courseData);
  };

  return (
    <>
      <h1>Edit course</h1>
      <CourseForm
        course={{
          id: "1",
          name: "Test Course",
          description: "Course Description",
          startDate: "2025-10-01",
          endDate: "2025-10-31",
        }}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};
