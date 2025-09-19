import { CustomError } from "../../shared/classes";
import { BASE_URL } from "../../shared/constants";
import { fetchWithToken } from "../../shared/utilities";
import { ICourse, ICourseLoader } from "../types";

export function courseLoader(id?: string): ICourseLoader {
  if (!id) throw new Response("Missing id", { status: 400 });

  try {
    const data = fetchWithToken<ICourse>(`${BASE_URL}/courses/${id}`);
    return { course: data };
  } catch (e) {
    if (e instanceof CustomError && e.errorCode === 401) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const msg = e instanceof Error ? e.message : "Failed to load course";
    throw new Response(msg, { status: 502 });
  }
}
