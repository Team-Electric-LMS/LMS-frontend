import { FormEventHandler, ReactElement, useState } from "react";
import { ICourse } from "../types";

interface CourseFormProps {
  course?: ICourse;
  onSubmit: () => Promise<void>;
}

export const CourseForm = ({
  course,
  onSubmit,
}: CourseFormProps): ReactElement => {
  const [error, setError] = useState<string | null>(null);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Course Form</h2>
      <form action=""></form>
    </>
  );
};
