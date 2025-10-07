import { CustomError } from "../../../shared/classes";
import { BASE_URL } from "../../../shared/constants";
import { ICourse } from "../types";

// Create a new course (admin/teacher view)
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

// Fetch all courses (admin/teacher view)
export async function getCourses(token: string): Promise<ICourse[]> {
  const url = `${BASE_URL}/courses`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new CustomError(response.status, "Failed to fetch courses");
  }
  return await response.json();
}

export async function searchCourses(query: string, token: string): Promise<ICourse[]> {
  const url = `${BASE_URL}/courses/search?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new CustomError(response.status, "Failed to fetch courses");
  }
  return await response.json();
}
