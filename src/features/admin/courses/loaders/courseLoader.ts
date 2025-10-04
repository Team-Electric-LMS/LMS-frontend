import { LoaderFunctionArgs } from "react-router";
import { CustomError } from "../../../shared/classes";
import { BASE_URL } from "../../../shared/constants";
import { fetchWithToken } from "../../../shared/utilities";
import { ICourse, ICourseLoader } from "../types";

export const courseLoader = async ({ params }: LoaderFunctionArgs): Promise<ICourseLoader> => {
  if (!params.id) throw new Response("Missing id", { status: 400 });

  try {
    const data = await fetchWithToken<ICourse>(`${BASE_URL}/courses/${params.id}`);
    if (!data) throw new Response("Course not found", { status: 404 });
    return { course: Promise.resolve(data) };
  } catch (e) {
    if (e instanceof CustomError && e.errorCode === 401) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const msg = e instanceof Error ? e.message : "Failed to get course";
    throw new Response(msg, { status: 502 });
  }
};
