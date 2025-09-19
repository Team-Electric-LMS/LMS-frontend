import { ReactElement } from "react";
import { CourseForm } from "./CourseForm";

export const CouseCreate = (): ReactElement => {
  const handleOnSubmit = async () => {};

  return (
    <>
      <h1>Create course</h1>
      <CourseForm onSubmit={handleOnSubmit} />
    </>
  );
};
