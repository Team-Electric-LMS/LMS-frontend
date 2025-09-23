import { ChangeEvent, FormEventHandler, ReactElement, useEffect, useState } from "react";
import { ICourse } from "../types";
import { Input, Textarea } from "../../shared/components";

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

  const validateForm = ({ name, description, startDate, endDate }: typeof data): string[] => {
    const errors: string[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!name.trim()) errors.push("Kursnamn är obligatoriskt");
    if (!description.trim()) errors.push("Beskrivning är obligatorisk");

    if (!startDate.trim()) {
      errors.push("Startdatum är obligatoriskt");
    } else {
      const date = new Date(startDate);
      if (isNaN(date.getTime())) errors.push("Ogiltigt startdatum");
      else if (date < today) errors.push("Startdatum kan inte vara i det förflutna");
    }

    if (!endDate.trim()) {
      errors.push("Slutdatum är obligatoriskt");
    } else {
      const date = new Date(endDate);
      if (isNaN(date.getTime())) errors.push("Ogiltigt slutdatum");
      else if (date < today) errors.push("Slutdatum kan inte vara i det förflutna");
      else if (startDate.trim() && !isNaN(new Date(startDate).getTime()) && date < new Date(startDate)) {
        errors.push("Slutdatum kan inte vara före startdatum");
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
    const formErrors = validateForm(data);
    setErrors(formErrors);
    if (formErrors.length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!course) setData({ name: "", description: "", startDate: "", endDate: "" });
    } catch {
      setErrors(["Ett fel uppstod vid sparande av kursen"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = data.name.trim() && data.description.trim() && data.startDate.trim() && data.endDate.trim();

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input
        label="Namn"
        name="name"
        type="text"
        value={data.name}
        onChange={handleChange}
        autoFocus={true}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Textarea
        label="Beskrivning"
        name="description"
        value={data.description}
        onChange={handleChange}
        autoFocus={false}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Input
        label="Startdatum"
        name="startDate"
        type="date"
        value={data.startDate}
        onChange={handleChange}
        autoFocus={false}
        disabled={isSubmitting}
        autoComplete="on"
      />
      <Input
        label="Slutdatum"
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
        {isSubmitting ? "Sparar..." : course ? "Uppdatera kurs" : "Skapa kurs"}
      </button>
    </form>
  );
};
