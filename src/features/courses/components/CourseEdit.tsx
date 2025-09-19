import { ReactElement } from "react";
import { CourseForm } from "./CourseForm";

export const CourseEdit = (): ReactElement => {
  const handleOnSubmit = async () => {};

  return (
    <>
      <h1>Edit course</h1>
      <CourseForm onSubmit={handleOnSubmit} />
    </>
  );
};
