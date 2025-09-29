import { CustomError } from "../../shared/classes";
import { BASE_URL } from "../../shared/constants";
import { ICourse } from "../types";

export async function createCourse(
  name: string,
  description: string,
  startDate: string,
  endDate: string
): Promise<ICourse> {
  const url = `${BASE_URL}/courses`;

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, startDate, endDate }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, "Cound not create course");
  }

  return (await response.json()) as ICourse;
}
