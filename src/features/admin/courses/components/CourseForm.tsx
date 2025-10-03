import { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from "react";
import { ICourse } from "../types";
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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isEdit = !!course;
    const formErrors = validateForm(data, isEdit);
    setErrors(formErrors);
    if (formErrors.length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!course) setData({ name: "", description: "", startDate: "", endDate: "" });
    } catch {
      setErrors(["An error occurred while saving the course"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = data.name.trim() && data.description.trim() && data.startDate.trim() && data.endDate.trim();

  return (
    <form className="create-course-form" onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        type="text"
        value={data.name}
        onChange={handleChange}
        autoFocus={true}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Textarea
        label="Description"
        name="description"
        value={data.description}
        onChange={handleChange}
        autoFocus={false}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Input
        label="Start date"
        name="startDate"
        type="date"
        value={data.startDate}
        onChange={handleChange}
        autoFocus={false}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Input
        label="End date"
        name="endDate"
        type="date"
        value={data.endDate}
        onChange={handleChange}
        autoFocus={false}
        disabled={isSubmitting}
        autoComplete="on"
      />

      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => (
            <span key={index} className="error-message">
              {error}
            </span>
          ))}
        </div>
      )}

      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Saving..." : course ? "Update course" : "Create course"}
      </button>
    </form>
  );
};