import { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from "react";
import { ICourse } from "../../types";
import { Input } from "../../../shared/components/Input";
import { Textarea } from "../../../shared/components/Textarea";

interface CourseFormProps {
  course?: ICourse;
  onSubmit: (data: { name: string; description: string; startDate: string; endDate: string }) => Promise<void>;
}

export const CourseForm = ({ course, onSubmit }: CourseFormProps): ReactElement => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    name: course?.name || "",
    description: course?.description || "",
    startDate: course?.startDate || "",
    endDate: course?.endDate || "",
  });

  useEffect(() => {
    if (course) {
      setData({
        name: course.name || "",
        description: course.description || "",
        startDate: course.startDate || "",
        endDate: course.endDate || "",
      });
    }
  }, [course]);

    const validateForm = ({ name, description, startDate, endDate }: typeof data, isEdit: boolean = false): string[] => {
      const errors: string[] = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!name.trim()) errors.push("Name is required");
      if (!description.trim()) errors.push("Description is required");

      if (!startDate.trim()) {
        errors.push("Start date is required");
      } else {
        const date = new Date(startDate);
        if (isNaN(date.getTime())) errors.push("Invalid start date");
        else if (!isEdit && date < today) errors.push("Start date cannot be in the past");
      }

      if (!endDate.trim()) {
        errors.push("End date is required");
      } else {
        const date = new Date(endDate);
        if (isNaN(date.getTime())) errors.push("Invalid end date");
        else if (!isEdit && date < today) errors.push("End date cannot be in the past");
        else if (startDate.trim() && !isNaN(new Date(startDate).getTime()) && date < new Date(startDate)) {
          errors.push("End date cannot be before start date");
        }
      }

      return errors;
    };

    // Add the missing return statement for the React component
    return (
      <form className="create-course-form">
        {/* Form fields and logic go here */}
      </form>
    )};
